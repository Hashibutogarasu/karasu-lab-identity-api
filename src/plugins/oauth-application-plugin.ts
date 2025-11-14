/* eslint-disable @typescript-eslint/no-unused-vars */
import { BetterAuthPlugin } from "better-auth"
import { APIError, createAuthEndpoint, sessionMiddleware } from "better-auth/api"
import { oauthApplicationModel } from "../generated/models.js";

export const oauthApplicationPlugin = () => {
  return {
    id: "oauth-application",
    endpoints: {
      oauthApplications: createAuthEndpoint('/oauth-applications', {
        method: 'GET',
        use: [sessionMiddleware],
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw new APIError('UNAUTHORIZED');
        }

        const applications = await ctx.context.adapter.findMany({
          model: 'oauthApplication',
          where: [
            {
              field: 'userId',
              value: user.id,
            }
          ]
        }) as unknown as oauthApplicationModel[];

        const apps = applications.map((app) => {
          const { clientSecret, ...oAuthapp } = app;

          return oAuthapp;
        })

        return apps;
      })
    }
  } satisfies BetterAuthPlugin
}