import { prismaAdapter } from "better-auth/adapters/prisma";
import { AbstractDatabaseService } from "./abstract-database.service.js";
import { PrismaClient } from "../../generated/client.js";

export class PostgresDatabaseService extends AbstractDatabaseService {
  private prisma: PrismaClient;

  constructor(environment: string, connectionString?: string) {
    super(environment);
    this.prisma = new PrismaClient(
      connectionString ? { datasourceUrl: connectionString } : undefined
    );
  }

  getHandler() {
    return prismaAdapter(this.prisma, { provider: 'postgresql' });
  }

  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
