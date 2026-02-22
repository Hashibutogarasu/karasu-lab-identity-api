import { Pool } from "pg";
import { Environment } from "../../types/environment.js";
import { AbstractDatabaseService } from "./abstract-database.service.js";

export class PostgresDatabaseService extends AbstractDatabaseService {
  private pool: Pool;

  constructor(environment: Environment, connectionString: string) {
    super(environment);
    this.pool = new Pool({
      connectionString,
    });
  }

  getHandler(): Pool {
    return this.pool;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
