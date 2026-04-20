import { PrismaClient } from '@prisma/client';
import {
  IDatabaseSeedingService,
  DatabaseSeedingConstants,
  SeedUser,
} from './seeding.service.interface.js';
import { hashPassword } from 'better-auth/crypto';
import cuid from 'cuid';
import { AbstractPluginEnvironment } from '../plugin/abstract-plugin-environment.js';
import { Environment } from '@hashibutogarasu/common';

const DEFAULT_SEED_USERS: SeedUser[] = [
  {
    id: DatabaseSeedingConstants.DUMMY_USER_ID,
    name: DatabaseSeedingConstants.DUMMY_USER_NAME,
    email: DatabaseSeedingConstants.DUMMY_EMAIL,
    password: DatabaseSeedingConstants.DUMMY_PASSWORD,
    role: 'admin',
  },
  {
    id: 'no-admin-user',
    name: 'No Admin',
    email: 'no-admin@example.com',
    password: DatabaseSeedingConstants.DUMMY_PASSWORD,
    role: 'user',
  },
];

/**
 * Abstract base class for database seeding services
 */
export abstract class AbstractDatabaseSeedingService
  extends AbstractPluginEnvironment<IDatabaseSeedingService>
  implements IDatabaseSeedingService
{
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly seedUsers: SeedUser[] = DEFAULT_SEED_USERS,
  ) {
    super();
  }

  abstract seed(): Promise<void>;

  resolve(): IDatabaseSeedingService {
    return this;
  }
}

/**
 * Production environment database seeding service
 * Does nothing by default
 */
class ProductionDatabaseSeedingService extends AbstractDatabaseSeedingService {
  async seed(): Promise<void> {
    return Promise.resolve();
  }
}

/**
 * Development environment database seeding service
 * Seeds users defined in the seedUsers array
 */
class DevelopmentDatabaseSeedingService extends AbstractDatabaseSeedingService {
  async seed(): Promise<void> {
    for (const seedUser of this.seedUsers) {
      await this.seedSingleUser(seedUser);
    }
  }

  private async seedSingleUser(seedUser: SeedUser): Promise<void> {
    try {
      let user = await this.prisma.user.findFirst({
        where: { email: seedUser.email },
      });

      if (!user) {
        console.log(`Seeding user: ${seedUser.email}...`);
        user = await this.prisma.user.create({
          data: {
            id: seedUser.id ?? cuid(),
            name: seedUser.name,
            email: seedUser.email,
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: seedUser.role ?? 'user',
          },
        });
        console.log(`User created: ${seedUser.email}`);
      }

      const existingAccount = await this.prisma.account.findFirst({
        where: {
          userId: user.id,
          providerId: 'credential',
        },
      });

      if (!existingAccount) {
        console.log(`Seeding account for: ${seedUser.email}...`);
        await this.prisma.account.create({
          data: {
            id: cuid(),
            accountId: user.id,
            providerId: 'credential',
            userId: user.id,
            password: await hashPassword(seedUser.password),
            updatedAt: new Date(),
          },
        });
        console.log(`Account created: ${seedUser.email}`);
      }
    } catch (err) {
      console.warn(
        `Failed to seed user ${seedUser.email} (DB might be offline):`,
        err instanceof Error ? err.message : err,
      );
    }
  }
}

/**
 * Test environment database seeding service
 * Does nothing as we use MockDatabaseSeedingService in tests
 */
class TestDatabaseSeedingService extends AbstractDatabaseSeedingService {
  async seed(): Promise<void> {
    return Promise.resolve();
  }
}

/**
 * Factory function to create database seeding service based on environment.
 * @param prisma PrismaClient instance
 * @param seedUsers Users to seed in development (defaults to a single dev admin user)
 * @returns Database seeding service instance
 *
 * @example
 * databaseSeedingFactory(prisma, [
 *   { name: 'Admin', email: 'admin@example.com', password: 'pass', role: 'admin' },
 *   { name: 'User',  email: 'user@example.com',  password: 'pass' },
 * ]);
 */
export function databaseSeedingFactory(
  prisma: PrismaClient,
  seedUsers: SeedUser[] = DEFAULT_SEED_USERS,
): IDatabaseSeedingService {
  return AbstractPluginEnvironment.resolve<
    IDatabaseSeedingService,
    AbstractDatabaseSeedingService,
    [PrismaClient, SeedUser[]]
  >(
    {
      [Environment.PRODUCTION]: ProductionDatabaseSeedingService as new (
        prisma: PrismaClient,
        seedUsers: SeedUser[],
      ) => AbstractDatabaseSeedingService,
      [Environment.DEVELOPMENT]: DevelopmentDatabaseSeedingService as new (
        prisma: PrismaClient,
        seedUsers: SeedUser[],
      ) => AbstractDatabaseSeedingService,
      [Environment.TEST]: TestDatabaseSeedingService as new (
        prisma: PrismaClient,
        seedUsers: SeedUser[],
      ) => AbstractDatabaseSeedingService,
    },
    prisma,
    seedUsers,
  );
}
