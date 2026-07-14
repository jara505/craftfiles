import os from 'os';
import { join } from 'path';

const VALID_PROFILES = ['backend', 'frontend'];
const VALID_AGENTS_MODES = ['file', 'memory'];
const MANIFEST_PATH = '.craftfiles.json';
const MEMORY_DIR = join(os.homedir(), '.ai_brain');
const MEMORY_FILE = join(MEMORY_DIR, 'shared_memory.json');

export { VALID_PROFILES, VALID_AGENTS_MODES, MANIFEST_PATH, MEMORY_DIR, MEMORY_FILE };
