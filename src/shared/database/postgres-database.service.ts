import { prismaAdapter } from "better-auth/adapters/prisma";
import { AbstractDatabaseService } from "./abstract-database.service.js";
import { PrismaClient } from "../../generated/client.js";

export class PostgresDatabaseService extends AbstractDatabaseService {
  private prisma: PrismaClient;

  constructor(environment: string, connectionString?: string) {
    super(environment);
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString || process.env.DATABASE_URL
        }
      }
    });
  }

  getHandler() {
    return prismaAdapter(this.prisma, { provider: 'postgresql' });
  }

  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
