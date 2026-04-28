import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';

const apiYamlConfigSchema = z.object({
  auth: z.object({
    trustedOrigins: z.array(z.string()),
    cookieDomain: z.string(),
    trustedProxies: z.array(z.string()),
  }),
  passkey: z.object({
    origins: z.array(z.string()),
  }),
  rateLimit: z.object({
    enabled: z.boolean(),
    window: z.number().optional(),
    max: z.number().optional(),
  }),
});

export type ApiYamlConfig = z.infer<typeof apiYamlConfigSchema>;

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

let _config: ApiYamlConfig | null = null;

/**
 * Loads, Zod-validates, and caches the YAML config for the current environment.
 * Reads from configs/{NODE_ENV}.yml relative to process.cwd().
 * In Docker, /app/configs/{env}.yml is available via image COPY or volume mount.
 */
export const getApiConfig = (): ApiYamlConfig => {
  if (_config) return _config;
  const env = process.env.NODE_ENV ?? 'development';
  const content = readConfigContent('configs', `${env}.yml`);
  if (!content) throw new Error(`configs/${env}.yml not found`);
  _config = apiYamlConfigSchema.parse(parse(content));
  return _config;
};
