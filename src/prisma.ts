/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

let prismaInstance: PrismaClient | null = null;

export function createPrisma(url: string = process.env.DATABASE_URL) {
  const pool = new pg.Pool({ 
    connectionString: url,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const getPrisma = () => {
  if (!prismaInstance) {
    prismaInstance = createPrisma();
  }
  return prismaInstance;
};

export default getPrisma;
