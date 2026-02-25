import fs from 'fs-extra';

const MANIFEST_PATH = '.craftfiles.json';

function readManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  return fs.readJsonSync(MANIFEST_PATH, { throws: false }) || {};
}

async function updateManifest(writtenFiles, profile) {
  const existing = readManifest();
  const writtenFilenames = writtenFiles.map(f => f.filename);
  const allTracked = [...new Set([...(existing.files || []), ...writtenFilenames])];

  const manifest = {
    version: 1,
    profile,
    files: allTracked,
    generatedAt: new Date().toISOString()
  };

  await fs.writeJson(MANIFEST_PATH, manifest, { spaces: 2 });
}

export { readManifest, updateManifest };
