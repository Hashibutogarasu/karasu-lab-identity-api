import { prismaAdapter } from "better-auth/adapters/prisma";
import { AbstractDatabaseService } from "./abstract-database.service.js";
import { PrismaClient } from "@prisma/client";
import { createPrisma } from "../../prisma.js";

export class PostgresDatabaseService extends AbstractDatabaseService {
  public prisma: PrismaClient;

  constructor(environment: string, connectionString?: string) {
    super(environment);
    this.prisma = createPrisma(connectionString || process.env.DATABASE_URL);
  }

  getHandler(): any {
    return prismaAdapter(this.prisma, { provider: 'postgresql' });
  }

  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
