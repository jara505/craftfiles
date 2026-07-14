import fs from 'fs-extra';

import { MANIFEST_PATH } from '../core/constants.js';

function readManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  return fs.readJsonSync(MANIFEST_PATH, { throws: false }) || {};
}

async function updateManifest(writtenFiles, profile, agentsMode = null) {
  const existing = readManifest();
  const writtenFilenames = writtenFiles.map((f) => f.filename);
  const allTracked = [...new Set([...(existing.files || []), ...writtenFilenames])];

  const manifest = {
    version: 1,
    profile,
    agentsMode,
    files: allTracked,
    generatedAt: new Date().toISOString(),
  };

  await fs.writeJson(MANIFEST_PATH, manifest, { spaces: 2 });
}

export { readManifest, updateManifest };
