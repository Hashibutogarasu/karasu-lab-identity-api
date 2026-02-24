/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";

export const discoveryPlugin = (): BetterAuthPlugin => {
	return {
		id: "discovery",
		endpoints: {
			getDiscovery: createAuthEndpoint(
				"/discovery",
				{
					method: "GET",
				},
				async (ctx) => {
					 
					const options = (ctx.context as any).options;

					if (!options) {
						return {
							providers: [],
							emailAndPassword: false,
							passkey: false,
							twoFactor: false,
							organization: false,
						};
					}

					const socialProviders = options.socialProviders || {};
					const providers = Object.keys(socialProviders).map((key) => ({
						id: key,
						enabled: true,
					}));

					await Promise.resolve();

					return {
						providers,
						emailAndPassword: !!options.emailAndPassword?.enabled,
						passkey: !!(options.plugins || []).find((p: any) => p.id === "passkey"),
						twoFactor: !!(options.plugins || []).find((p: any) => p.id === "two-factor"),
						organization: !!(options.plugins || []).find((p: any) => p.id === "organization"),
					};
				}
			),
		},
	};
};
