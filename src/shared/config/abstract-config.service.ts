import { AbstractEnvironment } from "./abstract-environment.js";
import { IConfigService } from "./config.service.interface.js";
import { AuthEnv } from "../../config/auth.env.js";

export abstract class AbstractConfigService extends AbstractEnvironment implements IConfigService {
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
}
