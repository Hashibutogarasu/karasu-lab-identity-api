import { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthEndpoint, sessionMiddleware } from "better-auth/api"
import { verifyPassword as verifyPasswordCrypto } from "better-auth/crypto";
import z4 from "zod/v4";

export const verifyPasswordPlugin = () => {
  return {
    id: "password-verify",
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
          throw new APIError('UNAUTHORIZED', {
            message: 'User is not authenticated',
          });
        }

        const account = await ctx.context.adapter.findOne({
          model: 'account',
          where: [{ field: 'userId', value: user.id }, { field: 'providerId', value: 'credentials' }],
        }) as any as { password: string | null } | null;

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
      })
    }
  } satisfies BetterAuthPlugin
}