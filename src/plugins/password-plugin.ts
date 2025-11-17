
import { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthEndpoint, sessionMiddleware } from "better-auth/api"
import { hashPassword, verifyPassword as verifyPasswordCrypto } from "better-auth/crypto";
import z4 from "zod/v4";
import cuid from "cuid";

export const passwordPlugin = () => {
  return {
    id: "password",
    endpoints: {
      verifyPassword: createAuthEndpoint('/password/verify', {
        method: 'POST',
        use: [sessionMiddleware],
        body: z4.object({
          password: z4.string().min(1),
        })
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;
        const { password } = ctx.body;

        if (!session || !user) {
          throw new APIError('UNAUTHORIZED');
        }

        const account = (await ctx.context.internalAdapter.findAccountByUserId(user.id))[0];

        if (!account || !account.password) {
          throw new APIError('BAD_REQUEST', {
            message: 'User does not have a password set',
          });
        }

        const valid = await verifyPasswordCrypto({
          password,
          hash: account.password,
        });

        return valid;
      }),
      setNewPassword: createAuthEndpoint('/password/set', {
        method: 'POST',
        use: [sessionMiddleware],
        body: z4.object({
          newPassword: z4.string().min(8),
        })
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;
        const { newPassword } = ctx.body;

        if (!session || !user) {
          throw new APIError('UNAUTHORIZED');
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
          throw new APIError('BAD_REQUEST', {
            message: 'User already has a password set',
          });
        }
      })
    }
  } satisfies BetterAuthPlugin
}