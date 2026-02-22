 
 
import { BetterAuthPlugin } from "better-auth"
import { createAuthEndpoint, sessionMiddleware } from "better-auth/api"
import z4 from "zod/v4";
import { OAuth } from "./oauth/oauth.js";

export const oauthApplicationPlugin = (oauth?: OAuth): BetterAuthPlugin => {
  if (!oauth) {
    oauth = new OAuth();
  }

  return {
    id: "oauth-application",
    endpoints: {
      oauthApplications: createAuthEndpoint('/oauth-applications/all', {
        method: 'GET',
        use: [sessionMiddleware],
      }, async (ctx) => oauth.manage.listAllApplications(ctx)),
      getOAuthApplication: createAuthEndpoint('/oauth-applications', {
        method: 'GET',
        body: z4.object({
          id: z4.string(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => oauth.manage.getApplicationById(ctx)),
      getOAuthApplicationByClientId: createAuthEndpoint('/oauth-applications/by-client-id', {
        method: 'GET',
        query: z4.object({
          client_id: z4.string(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => oauth.manage.getApplicationByClientId(ctx)),
      updateDisabled: createAuthEndpoint('/oauth-applications/update-disabled', {
        method: 'POST',
        use: [sessionMiddleware],
        body: z4.object({
          id: z4.string(),
          disabled: z4.boolean(),
        })
      }, async (ctx) => oauth.manage.updateApplicationDisabledStatus(ctx)),
      updateOAuthApplication: createAuthEndpoint('/oauth-applications/update', {
        method: 'POST',
        body: z4.object({
          id: z4.string(),
          name: z4.string().optional(),
          redirectUris: z4.array(z4.string()).optional(),
          description: z4.string().optional(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => oauth.manage.updateApplicationDetails(ctx)),
      regenerateSecret: createAuthEndpoint('/oauth-applications/regenerate-secret', {
        method: 'POST',
        body: z4.object({
          id: z4.string(),
        }),
        use: [sessionMiddleware],
      }, async (ctx) => oauth.manage.regenerateApplicationSecret(ctx)),
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
      }, async (ctx) => oauth.manage.deleteApplication(ctx)),
    }
  } satisfies BetterAuthPlugin
}
