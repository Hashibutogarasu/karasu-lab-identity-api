import { PrismaClient } from "@prisma/client";
import { IDatabaseSeedingService } from "./seeding.service.interface.js";
import { hashPassword } from "better-auth/crypto";
import cuid from "cuid";

export class DatabaseSeedingService implements IDatabaseSeedingService {
	constructor(private readonly prisma: PrismaClient) {}

	async seed(): Promise<void> {
		try {
			const dummyEmail = "dev@karasu256.com";
			const dummyPassword = "password1234";

			let user = await this.prisma.user.findFirst({
				where: { email: dummyEmail },
			});

			if (!user) {
				console.log("Seeding dummy user...");
				user = await this.prisma.user.create({
					data: {
						id: "dev-user-id",
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
