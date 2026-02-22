import { Environment } from "../../types/environment.js";
import { authEnvSchema } from "../../config/auth.env.js";
import { AbstractConfigService } from "./abstract-config.service.js";
import dotenv from "dotenv";

export class ConfigService extends AbstractConfigService {
  constructor(environment: Environment) {
    if (environment !== Environment.TEST) {
      dotenv.config();
    }
    
    const parsedConfig = authEnvSchema.parse(process.env);
    super(environment, parsedConfig);
  }
}
