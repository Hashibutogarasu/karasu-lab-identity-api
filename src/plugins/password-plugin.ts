
import { BetterAuthPlugin } from "better-auth"
import { createAuthEndpoint } from "better-auth/api"
import { hashPassword, verifyPassword as verifyPasswordCrypto } from "better-auth/crypto";
import cuid from "cuid";
import { createAPIError, ErrorCodes } from "../shared/errors/error.codes.js";
import { passwordPluginInterface } from "@karasu-lab/common";

export const passwordPlugin = (): BetterAuthPlugin => {
  const interfacePlugin = passwordPluginInterface();
  return {
    id: "password",
    endpoints: {
      verify: createAuthEndpoint(interfacePlugin.endpoints.verify.path, interfacePlugin.endpoints.verify.options, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;
        const { password } = ctx.body;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const account = (await ctx.context.internalAdapter.findAccountByUserId(user.id))[0];

        if (!account || !account.password) {
          throw createAPIError(ErrorCodes.AUTH.PASSWORD_NOT_SET);
        }

        const valid = await verifyPasswordCrypto({
          password,
          hash: account.password,
        });

        return valid;
      }),
      set: createAuthEndpoint(interfacePlugin.endpoints.set.path, interfacePlugin.endpoints.set.options, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;
        const { newPassword } = ctx.body;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const credentialAccounts = (await ctx.context.internalAdapter.findAccountByUserId(user.id)).filter((account) => {
          return account.password === null && account.providerId === 'credential';
        });

        if (credentialAccounts.length === 0) {
          await ctx.context.internalAdapter.createAccount({
            providerId: 'credential',
            providerAccountId: user.id,
            userId: user.id,
            password: await hashPassword(newPassword),
            accountId: cuid(),
          });

          return {
            success: true,
          }
        }
        else {
          throw createAPIError(ErrorCodes.AUTH.PASSWORD_ALREADY_SET);
        }
      })
    }
  } satisfies BetterAuthPlugin
}
