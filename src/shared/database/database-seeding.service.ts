import { PrismaClient } from "@prisma/client";
import { IDatabaseSeedingService, DatabaseSeedingConstants } from "./seeding.service.interface.js";
import { hashPassword } from "better-auth/crypto";
import cuid from "cuid";
import { AbstractPluginEnvironment } from "../plugin/abstract-plugin-environment.js";
import { Environment } from "@hashibutogarasu/common";

/**
 * Abstract base class for database seeding services
 */
export abstract class AbstractDatabaseSeedingService extends AbstractPluginEnvironment<IDatabaseSeedingService> implements IDatabaseSeedingService {
	constructor(protected readonly prisma: PrismaClient) {
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
 * Seeds a dummy user for development convenience
 */
class DevelopmentDatabaseSeedingService extends AbstractDatabaseSeedingService {
	async seed(): Promise<void> {
		try {
			const dummyEmail = DatabaseSeedingConstants.DUMMY_EMAIL;
			const dummyPassword = DatabaseSeedingConstants.DUMMY_PASSWORD;

			let user = await this.prisma.user.findFirst({
				where: { email: dummyEmail },
			});

			if (!user) {
				console.log("Seeding dummy user...");
				user = await this.prisma.user.create({
					data: {
						id: DatabaseSeedingConstants.DUMMY_USER_ID,
						name: "Dev User",
						email: dummyEmail,
						emailVerified: true,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				});
				console.log("Dummy user created.");
			}

			const existingAccount = await this.prisma.account.findFirst({
				where: {
					userId: user.id,
					providerId: "credential",
				},
			});

			if (!existingAccount) {
				console.log("Seeding dummy account...");
				await this.prisma.account.create({
					data: {
						id: cuid(),
						accountId: user.id,
						providerId: "credential",
						userId: user.id,
						password: await hashPassword(dummyPassword),
						updatedAt: new Date(),
					},
				});
				console.log("Dummy account created.");
			}
		} catch (err) {
			console.warn(
				"Failed to seed dummy user (DB might be offline):",
				err instanceof Error ? err.message : err
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
 * Factory function to create database seeding service based on environment
 * @param prisma PrismaClient instance
 * @returns Database seeding service instance
 */
export function databaseSeedingFactory(prisma: PrismaClient): IDatabaseSeedingService {
	return AbstractPluginEnvironment.resolve<
		IDatabaseSeedingService,
		AbstractDatabaseSeedingService,
		[PrismaClient]
	>(
		{
			[Environment.PRODUCTION]: ProductionDatabaseSeedingService as new (prisma: PrismaClient) => AbstractDatabaseSeedingService,
			[Environment.DEVELOPMENT]: DevelopmentDatabaseSeedingService as new (prisma: PrismaClient) => AbstractDatabaseSeedingService,
			[Environment.TEST]: TestDatabaseSeedingService as new (prisma: PrismaClient) => AbstractDatabaseSeedingService,
		},
		prisma
	);
}
