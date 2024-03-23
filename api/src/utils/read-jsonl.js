import fs from 'fs';
import path from 'path';

/**
 * Convert a JSONL file to JSON Object
 * @param {string} source - The path to the target file, relative to the server
 *    root.
 * @return {object}
 */
export default function readJSONL(source) {
  const raw = fs.readFileSync(path.resolve(source));

  let parsed = raw.toString().split('\n');
  parsed.length -= 1;
  parsed = JSON.parse(`[${parsed.join(',')}]`);

  return parsed;
}
