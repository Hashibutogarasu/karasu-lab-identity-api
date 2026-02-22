import { IOAuthManage, OAuthContext, OAuthApplication } from "./oauth.interface.js";
import { createAPIError, ErrorCodes } from "../../shared/errors/error.codes.js";
import { generateRandomString } from "better-auth/crypto";

export class OAuthManage implements IOAuthManage {
	async listAllApplications(ctx: OAuthContext): Promise<Partial<OAuthApplication>[]> {
		const session = ctx.context.session;
		if (!session) throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
		const user = session.user;

		const applications = (await ctx.context.adapter.findMany<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "userId",
					value: user.id,
				},
			],
		}));

		return applications.map((app: OAuthApplication): Partial<OAuthApplication> => {
			return {
				id: app.id,
				name: app.name,
				clientId: app.clientId,
				redirectURLs: app.redirectURLs,
				type: app.type,
				disabled: app.disabled,
				userId: app.userId,
				createdAt: app.createdAt,
				updatedAt: app.updatedAt,
			};
		});
	}

	async getApplicationById(ctx: OAuthContext): Promise<Partial<OAuthApplication>> {
		const session = ctx.context.session;
		if (!session) throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
		const user = session.user;

		const body = (ctx.body || {}) as { id: string };
		const applications = (await ctx.context.adapter.findMany<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: body.id,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));
		const application = applications[0];

		if (!application) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		return {
			id: application.id,
			name: application.name,
			clientId: application.clientId,
			redirectURLs: application.redirectURLs,
			type: application.type,
			disabled: application.disabled,
			userId: application.userId,
			createdAt: application.createdAt,
			updatedAt: application.updatedAt,
		};
	}

	async getApplicationByClientId(ctx: OAuthContext): Promise<Partial<OAuthApplication>> {
		const session = ctx.context.session;
		if (!session) throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
		const user = session.user;

		const query = (ctx.query || {}) as { client_id: string };
		const applications = (await ctx.context.adapter.findMany<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "clientId",
					value: query.client_id,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));
		const application = applications[0];

		if (!application) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		return {
			id: application.id,
			name: application.name,
			clientId: application.clientId,
			redirectURLs: application.redirectURLs,
			type: application.type,
			disabled: application.disabled,
			userId: application.userId,
			createdAt: application.createdAt,
			updatedAt: application.updatedAt,
		};
	}

	async updateApplicationDisabledStatus(ctx: OAuthContext): Promise<Partial<OAuthApplication>> {
		const session = ctx.context.session;
		if (!session) throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
		const user = session.user;

		const body = (ctx.body || {}) as { id: string; disabled: boolean };
		const application = (await ctx.context.adapter.findOne<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: body.id,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));

		if (!application) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		const appId = application.id;

		await ctx.context.adapter.update({
			model: "oauthApplication",
			where: [
				{
					operator: "eq",
					field: "id",
					value: appId,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
			update: {
				disabled: body.disabled,
			},
		});

		const updated = (await ctx.context.adapter.findOne<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: appId,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));

		if (!updated) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		return {
			id: updated.id,
			name: updated.name,
			clientId: updated.clientId,
			redirectURLs: updated.redirectURLs,
			type: updated.type,
			disabled: updated.disabled,
			userId: updated.userId,
			createdAt: updated.createdAt,
			updatedAt: updated.updatedAt,
		};
	}

	async updateApplicationDetails(ctx: OAuthContext): Promise<Partial<OAuthApplication>> {
		const session = ctx.context.session;
		if (!session) throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
		const user = session.user;

		const body = (ctx.body || {}) as { id: string; name: string; redirectUris: string[] };
		const applications = (await ctx.context.adapter.findMany<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: body.id,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));
		const application = applications[0];

		if (!application) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		const appId = application.id;
		const nameValue = body.name || "";
		const redirectURLsValue = (body.redirectUris || []).join(",");

		await ctx.context.adapter.update({
			model: "oauthApplication",
			where: [
				{
					operator: "eq",
					field: "id",
					value: appId,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
			update: {
				name: nameValue,
				redirectURLs: redirectURLsValue,
			},
		});

		const updated = (await ctx.context.adapter.findOne<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: appId,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));

		if (!updated) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		return {
			id: updated.id,
			name: updated.name,
			clientId: updated.clientId,
			redirectURLs: updated.redirectURLs,
			type: updated.type,
			disabled: updated.disabled,
			userId: updated.userId,
			createdAt: updated.createdAt,
			updatedAt: updated.updatedAt,
		};
	}

	async regenerateApplicationSecret(ctx: OAuthContext): Promise<OAuthApplication> {
		const session = ctx.context.session;
		if (!session) throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
		const user = session.user;

		const body = (ctx.body || {}) as { id: string };
		const applications = (await ctx.context.adapter.findMany<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: body.id,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));
		const application = applications[0];

		if (!application) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		const appId = application.id;
		const newSecret = generateRandomString(32);

		await ctx.context.adapter.update({
			model: "oauthApplication",
			where: [
				{
					operator: "eq",
					field: "id",
					value: appId,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
			update: {
				clientSecret: newSecret,
			},
		});

		const updated = (await ctx.context.adapter.findOne<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: appId,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));

		if (!updated) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		return updated;
	}

	async deleteApplication(ctx: OAuthContext): Promise<{ success: boolean }> {
		const session = ctx.context.session;
		if (!session) throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
		const user = session.user;

		const body = (ctx.body || {}) as { id: string };
		const applications = (await ctx.context.adapter.findMany<OAuthApplication>({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: body.id,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		}));
		const application = applications[0];

		if (!application) throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);

		const appId = application.id;

		await ctx.context.adapter.delete({
			model: "oauthApplication",
			where: [
				{
					field: "id",
					value: appId,
				},
				{
					field: "userId",
					value: user.id,
				},
			],
		});

		return { success: true };
	}
}
