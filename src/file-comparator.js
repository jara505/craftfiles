import fs from 'fs';

function classifyFiles(intendedFiles) {
  const toCreate = [];
  const differing = [];
  const upToDate = [];

  for (const file of intendedFiles) {
    if (fs.existsSync(file.filename)) {
      const existing = fs.readFileSync(file.filename, 'utf-8');
      if (existing === file.content) {
        upToDate.push(file);
      } else {
        differing.push(file);
      }
    } else {
      toCreate.push(file);
    }
  }

  return { toCreate, differing, upToDate };
}

export { classifyFiles };
