/* eslint-disable @typescript-eslint/unbound-method */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BetterAuthPlugin, Session, User, AuthContext } from "better-auth";
import { oauthApplicationPlugin } from "../src/plugins/oauth-application-plugin.js";
import { OAuthContext } from "../src/plugins/oauth/oauth.interface.js";
import { OAuth } from "../src/plugins/oauth/oauth.js";
import { OAuthManage } from "../src/plugins/oauth/oauth.manage.js";

vi.mock("../src/plugins/oauth/oauth.manage.js", () => {
	return {
		OAuthManage: vi.fn().mockImplementation(() => ({
			listAllApplications: vi.fn(),
			getApplicationById: vi.fn(),
			getApplicationByClientId: vi.fn(),
			updateApplicationDisabledStatus: vi.fn(),
			updateApplicationDetails: vi.fn(),
			regenerateApplicationSecret: vi.fn(),
			deleteApplication: vi.fn(),
		})),
	};
});

vi.mock("../src/plugins/oauth/oauth.js", () => {
	return {
		OAuth: vi.fn().mockImplementation(() => ({
			manage: new OAuthManage(),
		})),
	};
});

describe("oauthApplicationPlugin", () => {
	let plugin: BetterAuthPlugin;
	let mockOAuth: OAuth;

	beforeEach(() => {
		vi.clearAllMocks();
		
		mockOAuth = new OAuth();
		
		plugin = oauthApplicationPlugin(mockOAuth);
	});

	const getMockCtx = (): OAuthContext => ({
		body: {
			id: "test-app-id",
			name: "Test App",
			redirectUris: ["http://localhost/callback"],
			disabled: true,
		},
		query: {
			client_id: "test-client-id",
		},
		params: {},
		context: {
			session: {
				session: {} as unknown as Session,
				user: { id: "test-user-id" } as unknown as User,
			},
			adapter: {
				findMany: vi.fn().mockResolvedValue([]),
				findOne: vi.fn().mockResolvedValue({ id: "test-app-id" }),
				update: vi.fn().mockResolvedValue({}),
				delete: vi.fn().mockResolvedValue({}),
			} as unknown as AuthContext["adapter"],
		} as unknown as AuthContext & { session: { session: Session; user: User } },
	});

	it("should have the correct plugin id", () => {
		expect(plugin.id).toBe("oauth-application");
	});

	it("should call listAllApplications when oauthApplications endpoint is called", async () => {
		const endpoint = plugin.endpoints?.oauthApplications as any;
		await endpoint(getMockCtx());
		expect(mockOAuth.manage.listAllApplications).toHaveBeenCalled();
	});

	it("should call getApplicationById when getOAuthApplication endpoint is called", async () => {
		const endpoint = plugin.endpoints?.getOAuthApplication as any;
		await endpoint(getMockCtx());
		expect(mockOAuth.manage.getApplicationById).toHaveBeenCalled();
	});

	it("should call getApplicationByClientId when getOAuthApplicationByClientId endpoint is called", async () => {
		const endpoint = plugin.endpoints?.getOAuthApplicationByClientId as any;
		await endpoint(getMockCtx());
		expect(mockOAuth.manage.getApplicationByClientId).toHaveBeenCalled();
	});

	it("should call updateApplicationDisabledStatus when updateDisabled endpoint is called", async () => {
		const endpoint = plugin.endpoints?.updateDisabled as any;
		await endpoint(getMockCtx());
		expect(mockOAuth.manage.updateApplicationDisabledStatus).toHaveBeenCalled();
	});

	it("should call updateApplicationDetails when updateOAuthApplication endpoint is called", async () => {
		const endpoint = plugin.endpoints?.updateOAuthApplication as any;
		await endpoint(getMockCtx());
		expect(mockOAuth.manage.updateApplicationDetails).toHaveBeenCalled();
	});

	it("should call regenerateApplicationSecret when regenerateSecret endpoint is called", async () => {
		const endpoint = plugin.endpoints?.regenerateSecret as any;
		await endpoint(getMockCtx());
		expect(mockOAuth.manage.regenerateApplicationSecret).toHaveBeenCalled();
	});

	it("should call deleteApplication when deleteOAuthApplication endpoint is called", async () => {
		const endpoint = plugin.endpoints?.deleteOAuthApplication as any;
		await endpoint(getMockCtx());
		expect(mockOAuth.manage.deleteApplication).toHaveBeenCalled();
	});
});
