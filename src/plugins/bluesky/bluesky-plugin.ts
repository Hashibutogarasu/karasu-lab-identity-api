import type { OAuthProvider } from 'better-auth';
import { BetterAuthPlugin } from 'better-auth';
import { createAuthMiddleware, getOAuthState } from 'better-auth/api';
import { parseEnvelope, symmetricEncrypt } from 'better-auth/crypto';
import { createAuthorizationURL, validateAuthorizationCode } from '@better-auth/core/oauth2';
import { SecretConfig } from '@better-auth/core';
import { exportJWK, generateKeyPair, calculateJwkThumbprint, SignJWT } from 'jose';
import type { JWK, CryptoKey as JoseCryptoKey } from 'jose';

export type BlueskyOAuthConfig = {
  clientId: string;
  clientSecret?: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
  scope?: string[];
  authentication?: 'basic' | 'post';
};

type BlueskyPluginOptions = {
  oauth?: BlueskyOAuthConfig | null;
  refreshTokenSecret?: string | null;
};

const buildSecretConfig = (secret: string): SecretConfig => ({
  keys: new Map([[1, secret]]),
  currentVersion: 1,
});

const buildDefaultOAuthConfig = (): BlueskyOAuthConfig | null => {
  const baseUrl = process.env.BETTER_AUTH_URL;
  if (!baseUrl) return null;

  return {
    clientId: `${baseUrl}/api/bluesky/oauth/client-metadata.json`,
    authorizationEndpoint:
      process.env.BLUESKY_AUTHORIZATION_URL ??
      'https://bsky.social/oauth/authorize',
    tokenEndpoint:
      process.env.BLUESKY_TOKEN_URL ?? 'https://bsky.social/oauth/token',
    userInfoEndpoint:
      process.env.BLUESKY_USERINFO_URL ?? 'https://bsky.social/oauth/userinfo',
    scope: ['atproto', 'transition:generic'],
  };
};

type OAuthTokens = {
  accessToken?: string | null;
};

let _dpopPrivateKey: JoseCryptoKey | null = null;
let _dpopPublicKeyJwk: JWK | null = null;
let _dpopJkt: string | null = null;

async function getDpopState(): Promise<{ privateKey: JoseCryptoKey; publicKeyJwk: JWK; jkt: string }> {
  if (!_dpopPrivateKey) {
    const { privateKey, publicKey } = await generateKeyPair('ES256');
    _dpopPrivateKey = privateKey;
    _dpopPublicKeyJwk = await exportJWK(publicKey);
    _dpopJkt = await calculateJwkThumbprint(_dpopPublicKeyJwk);
  }
  return { privateKey: _dpopPrivateKey, publicKeyJwk: _dpopPublicKeyJwk!, jkt: _dpopJkt! };
}

async function createDpopProof(htm: string, htu: string): Promise<string> {
  const { privateKey, publicKeyJwk } = await getDpopState();
  return new SignJWT({ htm, htu })
    .setProtectedHeader({ alg: 'ES256', typ: 'dpop+jwt', jwk: publicKeyJwk })
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .sign(privateKey);
}

const mapBlueskyUserProfile = (profile: Record<string, unknown>) => {
  const idCandidate = profile.sub ?? profile.id ?? profile.did ?? profile.handle;
  const isStringifiableId =
    typeof idCandidate === 'string' ||
    typeof idCandidate === 'number' ||
    typeof idCandidate === 'bigint';

  if (!isStringifiableId) return null;

  const email =
    (typeof profile.email === 'string' ? profile.email : null) ?? null;
  const name =
    (typeof profile.name === 'string' && profile.name) ||
    (typeof profile.display_name === 'string' && profile.display_name) ||
    (typeof profile.handle === 'string' && profile.handle) ||
    undefined;
  const image =
    (typeof profile.picture === 'string' && profile.picture) ||
    (typeof profile.avatar === 'string' && profile.avatar) ||
    undefined;
  const emailVerified = Boolean(
    profile.email_verified ?? profile.emailVerified ?? false,
  );

  return {
    id: String(idCandidate),
    email,
    name,
    image,
    emailVerified,
  };
};

export const blueskyPlugin = (
  options: BlueskyPluginOptions = {},
): BetterAuthPlugin => {
  const oauth = options.oauth ?? buildDefaultOAuthConfig();
  const encryptionKey =
    options.refreshTokenSecret ??
    process.env.BLUESKY_REFRESH_TOKEN_SECRET ??
    null;

  return {
    id: 'bluesky',
    init: (ctx) => {
      if (!oauth) return;

      const provider: OAuthProvider<Record<string, unknown>> = {
        id: 'bluesky',
        name: 'Bluesky',
        async createAuthorizationURL(data): Promise<URL> {
          const { jkt } = await getDpopState();
          const url = new URL(data.redirectURI);
          const dynamicBaseUrl = `${url.protocol}//${url.host}`;
          const oauthOptions = {
            clientId: `${dynamicBaseUrl}/api/bluesky/oauth/client-metadata.json`,
            ...(oauth.clientSecret
              ? { clientSecret: oauth.clientSecret }
              : {}),
          };
          const oauthState = await getOAuthState();
          const loginHint =
            typeof oauthState?.loginHint === 'string'
              ? oauthState.loginHint
              : data.loginHint;
          return createAuthorizationURL({
            id: 'bluesky',
            authorizationEndpoint: oauth.authorizationEndpoint,
            redirectURI: data.redirectURI,
            state: data.state,
            codeVerifier: data.codeVerifier,
            scopes: data.scopes ?? oauth.scope,
            loginHint,
            options: {
              ...oauthOptions,
            },
            additionalParams: { dpop_jkt: jkt },
          });
        },
        async validateAuthorizationCode(data) {
          const url = new URL(data.redirectURI);
          const dynamicBaseUrl = `${url.protocol}//${url.host}`;
          const oauthOptions = {
            clientId: `${dynamicBaseUrl}/api/bluesky/oauth/client-metadata.json`,
            ...(oauth.clientSecret
              ? { clientSecret: oauth.clientSecret }
              : {}),
          };
          const dpopProof = await createDpopProof('POST', oauth.tokenEndpoint);
          return validateAuthorizationCode({
            code: data.code,
            codeVerifier: data.codeVerifier,
            redirectURI: data.redirectURI,
            deviceId: data.deviceId,
            tokenEndpoint: oauth.tokenEndpoint,
            authentication: oauth.authentication,
            options: {
              ...oauthOptions,
            },
            headers: { DPoP: dpopProof },
          });
        },
        async getUserInfo(tokens: OAuthTokens) {
          if (!tokens.accessToken) return null;

          const response = await fetch(oauth.userInfoEndpoint, {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });

          if (!response.ok) return null;

          const data = (await response.json()) as Record<string, unknown>;
          const user = mapBlueskyUserProfile(data);
          if (!user) return null;

          return { user, data };
        },
      };

      return {
        context: {
          socialProviders: [provider, ...ctx.socialProviders],
        },
      };
    },
    hooks: {
      after: [
        {
          matcher: (context) => {
            if (!context.path?.includes('/callback')) return false;
            if (context.params?.id !== 'bluesky') return false;
            return true;
          },
          handler: createAuthMiddleware(async (context) => {
            if (!encryptionKey) return;

            const oauthState = await getOAuthState();
            if (!oauthState?.link?.userId) return;

            const accounts = await context.context.internalAdapter.findAccountByUserId(
              oauthState.link.userId,
            );
            const blueskyAccount = accounts.find(
              (account) => account.providerId === 'bluesky',
            );

            if (!blueskyAccount?.refreshToken) return;
            if (parseEnvelope(blueskyAccount.refreshToken)) return;

            const encryptedRefreshToken = await symmetricEncrypt({
              key: buildSecretConfig(encryptionKey),
              data: blueskyAccount.refreshToken,
            });

            await context.context.internalAdapter.updateAccount(
              blueskyAccount.id,
              { refreshToken: encryptedRefreshToken },
            );
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
};
