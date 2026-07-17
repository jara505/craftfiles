import fs from 'fs-extra';
import { dirname } from 'path';
import inquirer from 'inquirer';
import { readManifest } from '../utils/manifest.js';
import { MEMORY_FILE } from '../core/constants.js';

function collectParentDirs(filePaths) {
  const dirs = new Set();
  for (const fp of filePaths) {
    let dir = dirname(fp);
    while (dir && dir !== '.' && dir !== '/') {
      dirs.add(dir);
      dir = dirname(dir);
    }
  }
  return [...dirs].sort((a, b) => b.split('/').length - a.split('/').length);
}

function buildSummary(files, hasMemory) {
  const lines = [];

  if (files.length > 0) {
    const examples = files.slice(0, 3).join(', ');
    const suffix = files.length > 3 ? `, +${files.length - 3} more` : '';
    lines.push(
      `  • ${files.length} project file${files.length > 1 ? 's' : ''} (${examples}${suffix})`
    );
  }

  if (hasMemory) {
    lines.push(`  • 1 memory file (${MEMORY_FILE})`);
  }

  lines.push('  • .craftfiles.json (manifest)');

  return lines.join('\n');
}

async function cleanCommand() {
  const manifest = readManifest();

  if (!manifest || Object.keys(manifest).length === 0) {
    console.error('❌ No CraftFiles project found. Run `craftfiles init` first.');
    process.exit(1);
  }

  const files = manifest.files || [];
  const hasMemory = manifest.agentsMode === 'memory';

  if (files.length === 0 && !hasMemory) {
    console.log('Nothing to clean.');
    return;
  }

  console.log('🧹 CraftFiles Clean\n');
  console.log('Will remove:');
  console.log(buildSummary(files, hasMemory));

  let confirm = true;
  if (process.stdout.isTTY) {
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: 'Remove all?',
      default: false,
    });
    confirm = answer.confirm;
  }

  if (!confirm) {
    console.log('Clean cancelled.');
    return;
  }

  let removed = 0;
  let errors = 0;

  // Delete tracked files
  for (const f of files) {
    try {
      if (fs.existsSync(f)) {
        await fs.remove(f);
        removed++;
      }
    } catch {
      errors++;
    }
  }

  // Delete memory file if mode was memory
  if (hasMemory) {
    try {
      if (fs.existsSync(MEMORY_FILE)) {
        await fs.remove(MEMORY_FILE);
        removed++;
      }
    } catch {
      errors++;
    }
  }

  // Clean empty parent directories
  const parentDirs = collectParentDirs(files);
  for (const dir of parentDirs) {
    try {
      if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
        await fs.remove(dir);
      }
    } catch {
      // Skip
    }
  }

  // Clean .ai_brain if empty
  if (hasMemory) {
    const memDir = dirname(MEMORY_FILE);
    try {
      if (fs.existsSync(memDir) && fs.readdirSync(memDir).length === 0) {
        await fs.remove(memDir);
      }
    } catch {
      // Skip
    }
  }

  // Delete manifest last
  try {
    await fs.remove('.craftfiles.json');
    removed++;
  } catch {
    errors++;
  }

  const status = errors > 0 ? ` (${errors} errors)` : '';
  console.log(`\n✅ Clean completed — ${removed} file${removed !== 1 ? 's' : ''} removed${status}`);
}

export { cleanCommand };
