/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BetterAuthPlugin, Where } from "better-auth"
import { createAuthEndpoint, sessionMiddleware } from "better-auth/api"
import { oauthApplicationModel } from "../generated/models.js";
import { generateRandomString } from "better-auth/crypto";
import z4 from "zod/v4";
import { createAPIError, ErrorCodes } from "../shared/errors/error.codes.js";

export const oauthApplicationPlugin = (): BetterAuthPlugin => {
  return {
    id: "oauth-application",
    endpoints: {
      oauthApplications: createAuthEndpoint('/oauth-applications/all', {
        method: 'GET',
        use: [sessionMiddleware],
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
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
      }),
      getOAuthApplication: createAuthEndpoint('/oauth-applications', {
        method: 'GET',
        body: z4.object({
          id: z4.string(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const applications = await ctx.context.adapter.findMany({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: ctx.body.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        }) as unknown as oauthApplicationModel[];
        const application = applications[0];

        if (!application) {
          throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);
        }

        const { clientSecret, ...oAuthapp } = application;

        return oAuthapp;
      }),
      getOAuthApplicationByClientId: createAuthEndpoint('/oauth-applications/by-client-id', {
        method: 'GET',
        query: z4.object({
          client_id: z4.string(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const applications = await ctx.context.adapter.findMany({
          model: 'oauthApplication',
          where: [
            {
              field: 'clientId',
              value: ctx.query.client_id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        }) as unknown as oauthApplicationModel[];
        const application = applications[0];

        if (!application) {
          throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);
        }

        const { clientSecret, ...oAuthapp } = application;

        return oAuthapp;
      }),
      updateDisabled: createAuthEndpoint('/oauth-applications/update-disabled', {
        method: 'POST',
        use: [sessionMiddleware],
        body: z4.object({
          id: z4.string(),
          disabled: z4.boolean(),
        })
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const application = await ctx.context.adapter.findOne({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: ctx.body.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        }) as unknown as oauthApplicationModel;

        if (!application) {
          throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);
        }

        await ctx.context.adapter.update({
          model: 'oauthApplication',
          where: [
            {
              operator: 'eq',
              field: 'id',
              value: application.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ],
          update: {
            disabled: ctx.body.disabled,
          },
        });

        const updated = await ctx.context.adapter.findOne({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: application.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        });

        const { clientSecret, ...oAuthapp } = updated as oauthApplicationModel;

        return oAuthapp;
      }),
      updateOAuthApplication: createAuthEndpoint('/oauth-applications/update', {
        method: 'POST',
        body: z4.object({
          id: z4.string(),
          name: z4.string().optional(),
          redirectUris: z4.array(z4.string()).optional(),
          description: z4.string().optional(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const applications = await ctx.context.adapter.findMany({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: ctx.body.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        }) as unknown as oauthApplicationModel[];
        const application = applications[0];

        if (!application) {
          throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);
        }

        const redirectUris = ctx.body.redirectUris.join(',');

        await ctx.context.adapter.update({
          model: 'oauthApplication',
          where: [
            {
              operator: 'eq',
              field: 'id',
              value: application.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ],
          update: {
            name: ctx.body.name,
            redirectURLs: redirectUris,
          },
        });

        const updated = await ctx.context.adapter.findOne({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: application.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        });

        const { clientSecret, ...oAuthapp } = updated as oauthApplicationModel;

        return oAuthapp;
      }),
      regenerateSecret: createAuthEndpoint('/oauth-applications/regenerate-secret', {
        method: 'POST',
        body: z4.object({
          id: z4.string(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const applications = await ctx.context.adapter.findMany({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: ctx.body.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        }) as unknown as oauthApplicationModel[];
        const application = applications[0];

        if (!application) {
          throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);
        }

        const newSecret = generateRandomString(32);

        await ctx.context.adapter.update({
          model: 'oauthApplication',
          where: [
            {
              operator: 'eq',
              field: 'id',
              value: application.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ],
          update: {
            clientSecret: newSecret,
          },
        });

        const updated = await ctx.context.adapter.findOne({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: application.id,
            }
          ]
        });

        return updated as oauthApplicationModel;
      }),
      deleteOAuthApplication: createAuthEndpoint('/oauth-applications/delete', {
        method: 'POST',
        metadata: {
          openapi: {
            responses: {
              200: {
                description: "OAuth Application deleted successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean",
                          example: true,
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        body: z4.object({
          id: z4.string(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => {
        const session = ctx.context.session;
        const user = ctx.context.session.user;

        if (!session || !user) {
          throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const applications = await ctx.context.adapter.findMany({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: ctx.body.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        }) as unknown as oauthApplicationModel[];
        const application = applications[0];

        if (!application) {
          throw createAPIError(ErrorCodes.OAUTH.APPLICATION_NOT_FOUND);
        }

        await ctx.context.adapter.delete({
          model: 'oauthApplication',
          where: [
            {
              field: 'id',
              value: application.id,
            },
            {
              field: 'userId',
              value: user.id,
            }
          ]
        });

        return { success: true };
      }),
    }
  } satisfies BetterAuthPlugin
}
