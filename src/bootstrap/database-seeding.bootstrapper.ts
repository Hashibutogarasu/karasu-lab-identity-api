import { IBetterAuthBootStrapper } from "./better-auth-bootstrapper.interface.js";
import { DatabaseSeedingService } from "../shared/database/database-seeding.service.js";

export class DatabaseSeedingBootStrapper implements IBetterAuthBootStrapper {
  constructor(private seedingService: DatabaseSeedingService) {}

  async bootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
