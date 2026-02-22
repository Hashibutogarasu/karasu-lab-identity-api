import { Database } from "better-sqlite3";
import sqlite3 from "better-sqlite3";
import { Environment } from "../../src/types/environment.js";
import { AbstractDatabaseService } from "../../src/shared/database/abstract-database.service.js";

export class MemoryDatabaseService extends AbstractDatabaseService {
  private db: Database;

  constructor(environment: Environment = Environment.TEST) {
    super(environment);
    this.db = new sqlite3(":memory:");
  }

  getHandler(): Database {
    return this.db;
  }

  close(): Promise<void> {
    this.db.close();
    return Promise.resolve();
  }
}
