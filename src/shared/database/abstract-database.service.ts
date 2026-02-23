import { BaseEnvironmentConfig } from "../config/base-environment-config.js";
import { IDataBaseService } from "./database.service.interface.js";

export abstract class AbstractDatabaseService extends BaseEnvironmentConfig implements IDataBaseService {
  constructor(environment: string) {
    super(environment);
  }

  abstract getHandler(): any;
  abstract close(): Promise<void>;
}
