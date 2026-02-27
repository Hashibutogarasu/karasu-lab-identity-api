import { IBetterAuthBootStrapper } from "./better-auth-bootstrapper.interface.js";
import { IDatabaseSeedingService } from "../shared/database/seeding.service.interface.js";

export class DatabaseSeedingBootStrapper implements IBetterAuthBootStrapper {
  constructor(private seedingService: IDatabaseSeedingService) {}

  async bootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
