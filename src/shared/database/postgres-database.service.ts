import { Pool } from "pg";
import { AbstractDatabaseService } from "./abstract-database.service.js";

export class PostgresDatabaseService extends AbstractDatabaseService {
  private pool: Pool;

  constructor(environment: string, connectionString: string) {
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
