import { Environment } from "../../types/environment.js";
import { IDataBaseService } from "./database.service.interface.js";

export abstract class AbstractDatabaseService implements IDataBaseService {
  protected environment: Environment;

  constructor(environment: Environment) {
    this.environment = environment;
  }

  abstract getHandler(): any;
  abstract close(): Promise<void>;
}
