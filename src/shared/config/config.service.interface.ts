import { AuthEnv } from "../../config/auth.env.js";

export interface IConfigService {
  get<K extends keyof AuthEnv>(key: K): AuthEnv[K];
  getAll(): AuthEnv;
}
