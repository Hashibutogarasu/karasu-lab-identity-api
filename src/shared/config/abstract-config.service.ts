import { IConfigService } from "./config.service.interface.js";
import { AuthEnv } from "../../config/auth.env.js";

/**
 * Abstract base class for config services
 * Satisfies IConfigService interface for NestJS and environment patterns
 */
export abstract class AbstractConfigService extends IConfigService {
  protected config: AuthEnv;

  constructor(environment: string, config: AuthEnv) {
    super(environment);
    this.config = config;
  }

  get<K extends keyof AuthEnv>(key: K): AuthEnv[K] {
    return this.config[key];
  }

  getAll(): AuthEnv {
    return this.config;
  }

  /**
   * Resolve current instance
   */
  resolve(): IConfigService {
    return this;
  }
}
