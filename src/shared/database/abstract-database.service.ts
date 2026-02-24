import { AbstractEnvironment } from "../config/abstract-environment.js";
import { IDataBaseService } from "./database.service.interface.js";

export abstract class AbstractDatabaseService extends AbstractEnvironment implements IDataBaseService {
  constructor(environment: string) {
    super(environment);
  }

  abstract getHandler(): any;
  abstract close(): Promise<void>;
}
