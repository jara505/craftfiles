import fs from 'fs-extra';
import { MEMORY_FILE } from '../core/constants.js';

function memoryExists() {
  return fs.existsSync(MEMORY_FILE);
}

function readMemoryContent() {
  if (!memoryExists()) return null;
  try {
    return fs.readJsonSync(MEMORY_FILE, { throws: false });
  } catch {
    return null;
  }
}

export { memoryExists, readMemoryContent };
