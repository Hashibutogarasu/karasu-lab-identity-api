import { IEnvironment } from "@hashibutogarasu/common";
import { AuthEnv } from "../../config/auth.env.js";

export interface IConfigService extends IEnvironment {
  get<K extends keyof AuthEnv>(key: K): AuthEnv[K];
  getAll(): AuthEnv;
}
