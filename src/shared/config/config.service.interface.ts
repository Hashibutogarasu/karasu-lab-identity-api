import { AbstractEnvironment } from "@hashibutogarasu/common";
import { AuthEnv } from "../../config/auth.env.js";

/**
 * Interface for Config Service
 * Use IConfigService as injection token in NestJS
 */
export abstract class IConfigService extends AbstractEnvironment {
  abstract get<K extends keyof AuthEnv>(key: K): AuthEnv[K];
  abstract getAll(): AuthEnv;
}
