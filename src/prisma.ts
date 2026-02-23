/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

export function createPrisma(url: string = process.env.DATABASE_URL) {
  const pool = new pg.Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export default createPrisma();
