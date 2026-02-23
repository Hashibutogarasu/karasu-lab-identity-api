import { AuthEnv } from "../../config/auth.env.js";
import { IEnvironmentConfig } from "./environment-config.interface.js";

export interface IConfigService extends IEnvironmentConfig {
  get<K extends keyof AuthEnv>(key: K): AuthEnv[K];
  getAll(): AuthEnv;
}
