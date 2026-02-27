import { describe, it, expect, beforeEach, vi } from 'vitest';
import { testAuth } from './auth.setup.js';

const BASE_URL = 'http://localhost:3000/api/auth';
const CLIENT_ID = 'test-device-client';
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:device_code';

async function request(path: string, options: RequestInit = {}) {
  const url = BASE_URL + (path.startsWith('/') ? path : `/${path}`);
  const req = new Request(url, {
    headers: { 'Content-Type': 'application/json', Host: 'localhost:3000', Origin: 'http://localhost:3000' },
    ...options,
  });
  return testAuth.handler(req);
}

/**
 * Creates a verified user via sign-up + adapter.update, then signs in
 * to obtain a valid session cookie. Returns the full set-cookie string.
 */
async function createVerifiedUser(email: string, password: string): Promise<string> {
  const signUpRes = await request('/sign-up/email', {
    method: 'POST',
    body: JSON.stringify({ email, password, name: 'Device Test User' }),
  });

  if (signUpRes.status !== 200) {
    const body = await signUpRes.text();
    throw new Error(`sign-up failed (${signUpRes.status}): ${body}`);
  }

  const { user } = await signUpRes.json() as { user: { id: string } };

  const ctx = await testAuth.$context;
  await ctx.adapter.update({
    model: 'user',
    where: [{ field: 'id', value: user.id }],
    update: { emailVerified: true },
  });

  const signInRes = await request('/sign-in/email', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const cookie = signInRes.headers.get('set-cookie');
  if (!cookie) {
    const body = await signInRes.text();
    throw new Error(`sign-in returned no set-cookie (${signInRes.status}): ${body}`);
  }

  return cookie;
}

/** Issues a device code and returns the full response body. */
async function issueDeviceCode() {
  const res = await request('/device/code', {
    method: 'POST',
    body: JSON.stringify({ client_id: CLIENT_ID }),
  });
  return {
    res,
    body: await res.json() as {
      device_code: string;
      user_code: string;
      verification_uri: string;
      verification_uri_complete: string;
      expires_in: number;
      interval: number;
    },
  };
}

/** Approves a device code with an authenticated session cookie. */
async function approveDevice(userCode: string, cookie: string) {
  return request('/device/approve', {
    method: 'POST',
    body: JSON.stringify({ userCode }),
    headers: {
      'Content-Type': 'application/json',
      Host: 'localhost:3000',
      Origin: 'http://localhost:3000',
      Cookie: cookie,
    },
  });
}

/** Polls for a device token after approval. */
async function pollDeviceToken(deviceCode: string) {
  return request('/device/token', {
    method: 'POST',
    body: JSON.stringify({ grant_type: GRANT_TYPE, device_code: deviceCode, client_id: CLIENT_ID }),
  });
}

describe('Device Authorization (E2E)', () => {
  const suffix = Date.now();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('1. Device code issuance (no client secret required)', () => {
    it('issues device_code and user_code with only client_id', async () => {
      const { res, body } = await issueDeviceCode();

      expect(res.status).toBe(200);
      expect(body.device_code).toBeDefined();
      expect(body.user_code).toBeDefined();
      expect(body.verification_uri).toBeDefined();
      expect(body.verification_uri_complete).toBeDefined();
      expect(body.expires_in).toBeGreaterThan(0);
      expect(body.interval).toBeGreaterThan(0);
    });

    it('verification_uri_complete contains the user_code as query param', async () => {
      const { body } = await issueDeviceCode();
      expect(body.verification_uri_complete).toContain(body.user_code);
    });

    it('returns 400 when client_id is missing', async () => {
      const res = await request('/device/code', {
        method: 'POST',
        body: JSON.stringify({}),
      });
      expect(res.status).toBe(400);
    });
  });

  describe('2. User authorization of the device code', () => {
    it('GET /device verifies a valid user_code', async () => {
      const { body: code } = await issueDeviceCode();
      const verifyRes = await request(`/device?user_code=${code.user_code}`);

      expect(verifyRes.status).toBe(200);
      const verifyBody = await verifyRes.json() as { user_code: string; status: string };
      expect(verifyBody.status).toBe('pending');
    });

    it('GET /device returns 400 for an unknown user_code', async () => {
      const res = await request('/device?user_code=INVALID');
      expect(res.status).toBe(400);
    });

    it('authenticated user can approve a device code', async () => {
      const cookie = await createVerifiedUser(`approve-${suffix}@test.com`, 'Password123!');
      const { body: code } = await issueDeviceCode();

      const approveRes = await approveDevice(code.user_code, cookie);

      expect(approveRes.status).toBe(200);
      const approveBody = await approveRes.json() as { success: boolean };
      expect(approveBody.success).toBe(true);
    });

    it('unauthenticated approve returns 401', async () => {
      const { body: code } = await issueDeviceCode();
      const res = await request('/device/approve', {
        method: 'POST',
        body: JSON.stringify({ userCode: code.user_code }),
      });
      expect(res.status).toBe(401);
    });

    it('authenticated user can deny a device code', async () => {
      const cookie = await createVerifiedUser(`deny-${suffix}@test.com`, 'Password123!');
      const { body: code } = await issueDeviceCode();

      const denyRes = await request('/device/deny', {
        method: 'POST',
        body: JSON.stringify({ userCode: code.user_code }),
        headers: {
          'Content-Type': 'application/json',
          Host: 'localhost:3000',
          Origin: 'http://localhost:3000',
          Cookie: cookie,
        },
      });

      expect(denyRes.status).toBe(200);
      const denyBody = await denyRes.json() as { success: boolean };
      expect(denyBody.success).toBe(true);
    });
  });

  describe('3. Token retrieval and profile access after approval', () => {
    it('polling before approval returns authorization_pending', async () => {
      const { body: code } = await issueDeviceCode();
      const tokenRes = await pollDeviceToken(code.device_code);

      expect(tokenRes.status).toBe(400);
      const { error } = await tokenRes.json() as { error: string };
      expect(error).toBe('authorization_pending');
    });

    it('polling after denial returns access_denied', async () => {
      const cookie = await createVerifiedUser(`denied-poll-${suffix}@test.com`, 'Password123!');
      const { body: code } = await issueDeviceCode();

      await request('/device/deny', {
        method: 'POST',
        body: JSON.stringify({ userCode: code.user_code }),
        headers: { 'Content-Type': 'application/json', Host: 'localhost:3000', Origin: 'http://localhost:3000', Cookie: cookie },
      });

      const tokenRes = await pollDeviceToken(code.device_code);
      expect(tokenRes.status).toBe(400);
      const { error } = await tokenRes.json() as { error: string };
      expect(error).toBe('access_denied');
    });

    it('polling after approval returns access_token and profile is accessible', async () => {
      const cookie = await createVerifiedUser(`token-${suffix}@test.com`, 'Password123!');
      const { body: code } = await issueDeviceCode();

      await approveDevice(code.user_code, cookie);

      const tokenRes = await pollDeviceToken(code.device_code);
      expect(tokenRes.status).toBe(200);

      const tokenBody = await tokenRes.json() as { access_token: string; token_type: string; expires_in: number };
      expect(tokenBody.access_token).toBeDefined();
      expect(tokenBody.token_type).toBe('Bearer');
      expect(tokenBody.expires_in).toBeGreaterThan(0);

      const profileRes = await request('/get-session', {
        headers: {
          'Content-Type': 'application/json',
          Host: 'localhost:3000',
          Origin: 'http://localhost:3000',
          Authorization: `Bearer ${tokenBody.access_token}`,
        },
      });

      expect(profileRes.status).toBe(200);
      const profileBody = await profileRes.json() as { user: { email: string } };
      expect(profileBody.user).toBeDefined();
      expect(profileBody.user.email).toBe(`token-${suffix}@test.com`);
    });
  });

  describe('4. apiKey integration — long-lived access beyond device token expiry', () => {
    it('creates an API key from a device-obtained token', async () => {
      const cookie = await createVerifiedUser(`apikey-${suffix}@test.com`, 'Password123!');
      const { body: code } = await issueDeviceCode();
      await approveDevice(code.user_code, cookie);

      const { access_token } = await pollDeviceToken(code.device_code)
        .then((r) => r.json() as Promise<{ access_token: string }>);

      const createKeyRes = await request('/api-key/create', {
        method: 'POST',
        body: JSON.stringify({ name: 'device-derived-key' }),
        headers: {
          'Content-Type': 'application/json',
          Host: 'localhost:3000',
          Origin: 'http://localhost:3000',
          Authorization: `Bearer ${access_token}`,
        },
      });

      expect(createKeyRes.status).toBe(200);
      const { key } = await createKeyRes.json() as { key: string };
      expect(key).toBeDefined();
      expect(typeof key).toBe('string');
    });

    it('API key allows profile access after the device token session is expired', async () => {
      const cookie = await createVerifiedUser(`expiry-${suffix}@test.com`, 'Password123!');
      const { body: code } = await issueDeviceCode();
      await approveDevice(code.user_code, cookie);

      const { access_token } = await pollDeviceToken(code.device_code)
        .then((r) => r.json() as Promise<{ access_token: string }>);

      const { key } = await request('/api-key/create', {
        method: 'POST',
        body: JSON.stringify({ name: 'long-lived-key' }),
        headers: {
          'Content-Type': 'application/json',
          Host: 'localhost:3000',
          Origin: 'http://localhost:3000',
          Authorization: `Bearer ${access_token}`,
        },
      }).then((r) => r.json() as Promise<{ key: string }>);

      expect(typeof key).toBe('string');

      // Simulate device token expiry by marking the device session as expired.
      const ctx = await testAuth.$context;
      await ctx.adapter.update({
        model: 'session',
        where: [{ field: 'token', value: access_token }],
        update: { expiresAt: new Date(0) },
      });

      // Verify the original device token no longer returns an active session.
      const expiredRes = await request('/get-session', {
        headers: { 'Content-Type': 'application/json', Host: 'localhost:3000', Origin: 'http://localhost:3000', Authorization: `Bearer ${access_token}` },
      });
      expect(expiredRes.status).toBe(200);
      const expiredBody = await expiredRes.json() as null | { user: object };
      expect(expiredBody).toBeNull();

      // The API key is independent and has no expiry set — it remains valid.
      const profileRes = await request('/get-session', {
        headers: {
          'Content-Type': 'application/json',
          Host: 'localhost:3000',
          Origin: 'http://localhost:3000',
          'x-api-key': key,
        },
      });

      expect(profileRes.status).toBe(200);
      const profileBody = await profileRes.json() as { user: { email: string } };
      expect(profileBody.user.email).toBe(`expiry-${suffix}@test.com`);
    });
  });
});
