import { describe, it, expect, vi, beforeEach } from "vitest";
import { BetterAuthPlugin, Session, User, AuthContext } from "better-auth";
import { oauthApplicationPlugin } from "../src/plugins/oauth/oauth-application-plugin.js";
import { OAuthContext } from "../src/plugins/oauth/oauth.interface.js";
import { MockOAuth } from "./mocks/oauth.mock.js";
import { MockOAuthManage } from "./mocks/oauth-manage.mock.js";

describe("oauthApplicationPlugin", () => {
	let plugin: BetterAuthPlugin;
	let mockOAuth: MockOAuth;

	beforeEach(() => {
		vi.clearAllMocks();
		
		mockOAuth = new MockOAuth();
		
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
			id: "test-app-id",
			client_id: "test-client-id",
		},
		params: {},
		method: "POST" as const,
		path: "/test",
		request: {} as Request,
		headers: new Headers(),
		setCookie: vi.fn(),
		setHeaders: vi.fn(),
		setStatus: vi.fn(),
		getSignedCookie: vi.fn(),
		setSignedCookie: vi.fn(),
		setHeader: vi.fn(),
		getHeader: vi.fn(),
		getCookie: vi.fn(),
		json: vi.fn(),
		text: vi.fn(),
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
	} as unknown as OAuthContext);

	it("should have the correct plugin id", () => {
		expect(plugin.id).toBe("oauthApplications");
	});

	it("should call listAllApplications when all endpoint is called", async () => {
		const endpoint = plugin.endpoints?.all as any;
		await endpoint(getMockCtx());
		expect((mockOAuth.manage as MockOAuthManage).listAllApplications).toHaveBeenCalled();
	});

	it("should call getApplicationById when getApp endpoint is called", async () => {
		const endpoint = plugin.endpoints?.getApp as any;
		await endpoint(getMockCtx());
		expect((mockOAuth.manage as MockOAuthManage).getApplicationById).toHaveBeenCalled();
	});

	it("should call getApplicationByClientId when byClientId endpoint is called", async () => {
		const endpoint = plugin.endpoints?.byClientId as any;
		await endpoint(getMockCtx());
		expect((mockOAuth.manage as MockOAuthManage).getApplicationByClientId).toHaveBeenCalled();
	});

	it("should call updateApplicationDisabledStatus when updateDisabled endpoint is called", async () => {
		const endpoint = plugin.endpoints?.updateDisabled as any;
		await endpoint(getMockCtx());
		expect((mockOAuth.manage as MockOAuthManage).updateApplicationDisabledStatus).toHaveBeenCalled();
	});

	it("should call updateApplicationDetails when update endpoint is called", async () => {
		const endpoint = plugin.endpoints?.update as any;
		await endpoint(getMockCtx());
		expect((mockOAuth.manage as MockOAuthManage).updateApplicationDetails).toHaveBeenCalled();
	});

	it("should call regenerateApplicationSecret when regenerateSecret endpoint is called", async () => {
		const endpoint = plugin.endpoints?.regenerateSecret as any;
		await endpoint(getMockCtx());
		expect((mockOAuth.manage as MockOAuthManage).regenerateApplicationSecret).toHaveBeenCalled();
	});

	it("should call deleteApplication when delete endpoint is called", async () => {
		const endpoint = plugin.endpoints?.delete as any;
		await endpoint(getMockCtx());
		expect((mockOAuth.manage as MockOAuthManage).deleteApplication).toHaveBeenCalled();
	});
});
