import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

import type { Environment } from '@hashibutogarasu/common';

export interface ApiYamlConfig {
  auth: {
    trustedOrigins: string[];
    cookieDomain: string;
    trustedProxies: string[];
  };
  passkey: {
    origins: string[];
  };
  rateLimit: {
    enabled: boolean;
    window?: number;
    max?: number;
  };
}

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

const configCache = new Map<string, ApiYamlConfig>();

/**
 * Loads and caches the YAML config file for the given environment.
 * Reads from configs/{env}.yml relative to the project root (process.cwd()).
 * In Docker, process.cwd() = /app, so /app/configs/{env}.yml matches the volume mount.
 */
export const loadApiConfig = (env: Environment): ApiYamlConfig => {
  const cached = configCache.get(env);
  if (cached) return cached;
  const content = readConfigContent('configs', `${env}.yml`);
  if (!content) throw new Error(`configs/${env}.yml not found`);
  const parsed = parse(content) as ApiYamlConfig;
  configCache.set(env, parsed);
  return parsed;
};
