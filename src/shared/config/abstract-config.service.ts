import { Environment } from "../../types/environment.js";
import { AuthEnv } from "../../config/auth.env.js";
import { IConfigService } from "./config.service.interface.js";

export abstract class AbstractConfigService implements IConfigService {
  protected environment: Environment;
  protected config: AuthEnv;

  constructor(environment: Environment, config: AuthEnv) {
    this.environment = environment;
    this.config = config;
  }

  get<K extends keyof AuthEnv>(key: K): AuthEnv[K] {
    return this.config[key];
  }

  getAll(): AuthEnv {
    return this.config;
  }
}
