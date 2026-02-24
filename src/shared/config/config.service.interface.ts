import { AuthEnv } from "../../config/auth.env.js";
import { IEnvironment } from "./environment.interface.js";

export interface IConfigService extends IEnvironment {
  get<K extends keyof AuthEnv>(key: K): AuthEnv[K];
  getAll(): AuthEnv;
}
