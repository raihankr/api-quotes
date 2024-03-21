import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Convert a JSONL file to JSON Object
 * @param {string} source - The path to the target file, relative to the server
 *    root.
 * @return {object}
 */
export function readJSONL(source) {
  const raw = fs.readFileSync(path.resolve(__dirname, source));
  
  let parsed = raw.toString().split('\n')
  parsed.length--;
  parsed = JSON.parse('[' + parsed.join(',') + ']');
  
  return parsed;
}