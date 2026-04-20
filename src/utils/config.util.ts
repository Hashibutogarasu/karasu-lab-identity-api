import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads content from a configuration file relative to the project root.
 * @param relativePath Path segments relative to project root
 * @returns File content string or null if file does not exist or cannot be read
 */
export const readConfigContent = (...relativePath: string[]): string | null => {
  try {
    const configPath = path.join(process.cwd(), ...relativePath);
    if (fs.existsSync(configPath) && fs.lstatSync(configPath).isFile()) {
      return fs.readFileSync(configPath, 'utf-8');
    }
  } catch {
    // ignore
  }
  return null;
};
