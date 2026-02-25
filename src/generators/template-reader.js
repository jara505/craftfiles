import fs from 'fs-extra';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(__dirname, '..', 'templates');

function readTemplate(templateName) {
  return fs.readFileSync(join(templatesDir, templateName), 'utf-8');
}

export { readTemplate };
