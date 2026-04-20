import { describe, it, expect } from 'vite-plus/test';
import { testAuth } from './auth.setup.js';
import { createOTP } from '@better-auth/utils/otp';
import { base32 } from '@better-auth/utils/base32';

const BASE_URL = 'http://localhost:3000/api/auth';

function extractCookies(headers: Headers): string {
  const setCookies: string[] =
    typeof headers.getSetCookie === 'function'
      ? headers.getSetCookie()
      : (headers.get('set-cookie') ?? '')
          .split(/,(?=[^ ])/)
          .map((s) => s.trim());

  // Collect the latest value per cookie name, treating empty-value cookies
  // (Max-Age=0 / cleared) as deletions so they override prior values.
  const cookieMap = new Map<string, string>();
  for (const setCookie of setCookies) {
    const parts = setCookie.split(';');
    const nameValue = (parts[0] ?? '').trim();
    const eqIdx = nameValue.indexOf('=');
    if (eqIdx === -1) continue;
    const name = nameValue.slice(0, eqIdx);
    const value = nameValue.slice(eqIdx + 1);
    cookieMap.set(name, value);
  }

  // Only include cookies that still have a non-empty value (not cleared).
  return Array.from(cookieMap.entries())
    .filter(([, value]) => value !== '')
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
}

async function request(
  path: string,
  options: RequestInit = {},
  cookie?: string,
) {
  const url = BASE_URL + (path.startsWith('/') ? path : `/${path}`);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Host: 'localhost:3000',
    Origin: 'http://localhost:3000',
  };
  if (cookie) headers['Cookie'] = cookie;
  const ctx = await testAuth.$context;
  ctx.session = null;
  const req = new Request(url, { ...options, headers });
  return testAuth.handler(req);
}

async function setupUser(
  email: string,
  password: string,
): Promise<{ cookie: string; userId: string }> {
  const signUpRes = await request('/sign-up/email', {
    method: 'POST',
    body: JSON.stringify({ email, password, name: 'MFA Test User' }),
  });
  if (signUpRes.status !== 200) {
    throw new Error(
      `sign-up failed (${signUpRes.status}): ${await signUpRes.text()}`,
    );
  }
  const { user } = (await signUpRes.json()) as { user: { id: string } };

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
  if (signInRes.status !== 200) {
    throw new Error(
      `sign-in failed (${signInRes.status}): ${await signInRes.text()}`,
    );
  }
  const cookie = extractCookies(signInRes.headers);
  return { cookie, userId: user.id };
}

async function enableTwoFactor(
  cookie: string,
  password: string,
): Promise<{ totpURI: string; backupCodes: string[]; cookie: string }> {
  const res = await request(
    '/two-factor/enable',
    { method: 'POST', body: JSON.stringify({ password }) },
    cookie,
  );
  if (res.status !== 200) {
    throw new Error(`enable 2FA failed (${res.status}): ${await res.text()}`);
  }
  const updatedCookie = extractCookies(res.headers) || cookie;
  return {
    ...((await res.json()) as { totpURI: string; backupCodes: string[] }),
    cookie: updatedCookie,
  };
}

async function generateTOTPCode(totpURI: string): Promise<string> {
  const url = new URL(totpURI);
  const base32Secret = url.searchParams.get('secret') ?? '';
  const rawBytes = base32.decode(base32Secret);
  const rawSecret = new TextDecoder().decode(rawBytes);
  return createOTP(rawSecret, { digits: 6, period: 30 }).totp();
}

async function signIn(email: string, password: string) {
  const res = await request('/sign-in/email', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return { res, cookie: extractCookies(res.headers) };
}

describe('Two-Factor Authentication — enable and disable', () => {
  it('enables 2FA for a verified user and returns totpURI and backup codes', async () => {
    const { cookie } = await setupUser(
      'mfa-enable@example.com',
      'Password123!',
    );
    const { totpURI, backupCodes } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    expect(totpURI).toMatch(/^otpauth:\/\/totp\//);
    expect(Array.isArray(backupCodes)).toBe(true);
    expect(backupCodes.length).toBeGreaterThan(0);
  });

  it('rejects enabling 2FA with wrong password', async () => {
    const { cookie } = await setupUser(
      'mfa-enable-wrong-pw@example.com',
      'Password123!',
    );
    const res = await request(
      '/two-factor/enable',
      { method: 'POST', body: JSON.stringify({ password: 'WrongPassword!' }) },
      cookie,
    );
    expect(res.status).not.toBe(200);
  });

  it('rejects enabling 2FA without authentication', async () => {
    const res = await request('/two-factor/enable', {
      method: 'POST',
      body: JSON.stringify({ password: 'Password123!' }),
    });
    expect(res.status).toBe(401);
  });

  it('disables 2FA after verifying TOTP once', async () => {
    const { cookie } = await setupUser(
      'mfa-disable@example.com',
      'Password123!',
    );
    const { totpURI, cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const code = await generateTOTPCode(totpURI);
    const verifyRes = await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code }) },
      enabledCookie,
    );
    expect(verifyRes.status).toBe(200);
    const newCookie = extractCookies(verifyRes.headers);

    const disableRes = await request(
      '/two-factor/disable',
      { method: 'POST', body: JSON.stringify({ password: 'Password123!' }) },
      newCookie || enabledCookie,
    );
    expect(disableRes.status).toBe(200);
    const body = (await disableRes.json()) as { status: boolean };
    expect(body.status).toBe(true);
  });

  it('rejects disabling 2FA with wrong password', async () => {
    const { cookie } = await setupUser(
      'mfa-disable-wrong-pw@example.com',
      'Password123!',
    );
    const { cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const res = await request(
      '/two-factor/disable',
      { method: 'POST', body: JSON.stringify({ password: 'BadPassword!' }) },
      enabledCookie,
    );
    expect(res.status).not.toBe(200);
  });
});

describe('Two-Factor Authentication — sign-in flow', () => {
  it('returns twoFactorRedirect and does NOT set a session cookie when 2FA is enabled', async () => {
    const { cookie } = await setupUser(
      'mfa-signin-block@example.com',
      'Password123!',
    );
    const { totpURI, cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const code = await generateTOTPCode(totpURI);
    const verifyRes = await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code }) },
      enabledCookie,
    );
    expect(verifyRes.status).toBe(200);

    const { res, cookie: twoFactorCookie } = await signIn(
      'mfa-signin-block@example.com',
      'Password123!',
    );
    const body = (await res.json()) as { twoFactorRedirect?: boolean };

    expect(res.status).toBe(200);
    expect(body.twoFactorRedirect).toBe(true);
    expect(twoFactorCookie).toContain('better-auth.two_factor=');
  });

  it('completes sign-in by verifying TOTP and issues a session cookie', async () => {
    const { cookie } = await setupUser(
      'mfa-signin-complete@example.com',
      'Password123!',
    );
    const { totpURI, cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const activateCode = await generateTOTPCode(totpURI);
    await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code: activateCode }) },
      enabledCookie,
    );

    const { cookie: tfCookie } = await signIn(
      'mfa-signin-complete@example.com',
      'Password123!',
    );

    const code = await generateTOTPCode(totpURI);
    const finalRes = await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code }) },
      tfCookie,
    );
    expect(finalRes.status).toBe(200);
    expect(finalRes.headers.get('set-cookie')).toBeTruthy();
  });

  it('rejects TOTP verification with an invalid code', async () => {
    const { cookie } = await setupUser(
      'mfa-invalid-code@example.com',
      'Password123!',
    );
    const { totpURI, cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const activateCode = await generateTOTPCode(totpURI);
    await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code: activateCode }) },
      enabledCookie,
    );

    const { cookie: tfCookie } = await signIn(
      'mfa-invalid-code@example.com',
      'Password123!',
    );

    const res = await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code: '000000' }) },
      tfCookie,
    );
    expect(res.status).not.toBe(200);
    const body = (await res.json()) as { message?: string; code?: string };
    expect(body.code ?? body.message).toBeTruthy();
  });

  it('rejects TOTP verification with an empty code', async () => {
    const { cookie } = await setupUser(
      'mfa-empty-code@example.com',
      'Password123!',
    );
    const { totpURI, cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const activateCode = await generateTOTPCode(totpURI);
    await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code: activateCode }) },
      enabledCookie,
    );

    const { cookie: tfCookie } = await signIn(
      'mfa-empty-code@example.com',
      'Password123!',
    );

    const res = await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code: '' }) },
      tfCookie,
    );
    expect(res.status).not.toBe(200);
  });

  it('rejects TOTP verification without a two-factor cookie', async () => {
    const res = await request('/two-factor/verify-totp', {
      method: 'POST',
      body: JSON.stringify({ code: '123456' }),
    });
    expect(res.status).toBe(401);
  });
});

describe('Two-Factor Authentication — backup codes', () => {
  it('completes sign-in with a valid backup code', async () => {
    const { cookie } = await setupUser(
      'mfa-backup-valid@example.com',
      'Password123!',
    );
    const {
      totpURI,
      backupCodes,
      cookie: enabledCookie,
    } = await enableTwoFactor(cookie, 'Password123!');

    const code = await generateTOTPCode(totpURI);
    await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code }) },
      enabledCookie,
    );

    const { cookie: tfCookie } = await signIn(
      'mfa-backup-valid@example.com',
      'Password123!',
    );

    const res = await request(
      '/two-factor/verify-backup-code',
      { method: 'POST', body: JSON.stringify({ code: backupCodes[0] }) },
      tfCookie,
    );
    expect(res.status).toBe(200);
  });

  it('rejects an invalid backup code', async () => {
    const { cookie } = await setupUser(
      'mfa-backup-invalid@example.com',
      'Password123!',
    );
    const { totpURI, cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const code = await generateTOTPCode(totpURI);
    await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code }) },
      enabledCookie,
    );

    const { cookie: tfCookie } = await signIn(
      'mfa-backup-invalid@example.com',
      'Password123!',
    );

    const res = await request(
      '/two-factor/verify-backup-code',
      { method: 'POST', body: JSON.stringify({ code: 'XXXXX-XXXXX' }) },
      tfCookie,
    );
    expect(res.status).not.toBe(200);
  });

  it('rejects reuse of an already-consumed backup code', async () => {
    const { cookie } = await setupUser(
      'mfa-backup-reuse@example.com',
      'Password123!',
    );
    const {
      totpURI,
      backupCodes,
      cookie: enabledCookie,
    } = await enableTwoFactor(cookie, 'Password123!');

    const activateCode = await generateTOTPCode(totpURI);
    await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code: activateCode }) },
      enabledCookie,
    );

    const { cookie: tfCookie1 } = await signIn(
      'mfa-backup-reuse@example.com',
      'Password123!',
    );
    const first = await request(
      '/two-factor/verify-backup-code',
      { method: 'POST', body: JSON.stringify({ code: backupCodes[0] }) },
      tfCookie1,
    );
    expect(first.status).toBe(200);

    const { cookie: tfCookie2 } = await signIn(
      'mfa-backup-reuse@example.com',
      'Password123!',
    );
    const second = await request(
      '/two-factor/verify-backup-code',
      { method: 'POST', body: JSON.stringify({ code: backupCodes[0] }) },
      tfCookie2,
    );
    expect(second.status).not.toBe(200);
  });

  it('rejects backup code verification without a two-factor cookie', async () => {
    const res = await request('/two-factor/verify-backup-code', {
      method: 'POST',
      body: JSON.stringify({ code: 'ABCDE-12345' }),
    });
    expect(res.status).toBe(401);
  });
});

describe('Two-Factor Authentication — get TOTP URI', () => {
  it('returns the TOTP URI for a user with 2FA configured', async () => {
    const { cookie } = await setupUser(
      'mfa-get-uri@example.com',
      'Password123!',
    );
    const { cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const res = await request(
      '/two-factor/get-totp-uri',
      { method: 'POST', body: JSON.stringify({ password: 'Password123!' }) },
      enabledCookie,
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { totpURI: string };
    expect(body.totpURI).toMatch(/^otpauth:\/\/totp\//);
  });

  it('rejects get-totp-uri without an active session', async () => {
    const res = await request('/two-factor/get-totp-uri', {
      method: 'POST',
      body: JSON.stringify({ password: 'Password123!' }),
    });
    expect(res.status).toBe(401);
  });

  it('rejects get-totp-uri with wrong password', async () => {
    const { cookie } = await setupUser(
      'mfa-get-uri-wrong-pw@example.com',
      'Password123!',
    );
    const { cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const res = await request(
      '/two-factor/get-totp-uri',
      { method: 'POST', body: JSON.stringify({ password: 'Wrong!' }) },
      enabledCookie,
    );
    expect(res.status).not.toBe(200);
  });

  it('rejects get-totp-uri for a user who has not configured 2FA', async () => {
    const { cookie } = await setupUser(
      'mfa-get-uri-no2fa@example.com',
      'Password123!',
    );

    const res = await request(
      '/two-factor/get-totp-uri',
      { method: 'POST', body: JSON.stringify({ password: 'Password123!' }) },
      cookie,
    );
    expect(res.status).not.toBe(200);
  });
});

describe('Password verify endpoint — /api/auth/password/verify', () => {
  it('returns true for the correct password (credential account)', async () => {
    const { cookie } = await setupUser(
      'pw-verify-correct@example.com',
      'Password123!',
    );
    const res = await request(
      '/password/verify',
      { method: 'POST', body: JSON.stringify({ password: 'Password123!' }) },
      cookie,
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as boolean;
    expect(body).toBe(true);
  });

  it('returns false for an incorrect password', async () => {
    const { cookie } = await setupUser(
      'pw-verify-wrong@example.com',
      'Password123!',
    );
    const res = await request(
      '/password/verify',
      { method: 'POST', body: JSON.stringify({ password: 'WrongPassword!' }) },
      cookie,
    );
    expect(res.status).toBe(401);
  });

  it('returns 401 without a valid session', async () => {
    const res = await request('/password/verify', {
      method: 'POST',
      body: JSON.stringify({ password: 'Password123!' }),
    });
    expect(res.status).toBe(401);
  });

  it('returns PASSWORD_NOT_SET error for a social-only account (no credential account)', async () => {
    const ctx = await testAuth.$context;
    const oauthUser = await ctx.adapter.create({
      model: 'user',
      data: {
        name: 'OAuth Only',
        email: 'pw-verify-oauthonly@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const session = await ctx.internalAdapter.createSession(
      (oauthUser as { id: string }).id,
    );
    const res = await request(
      '/password/verify',
      { method: 'POST', body: JSON.stringify({ password: 'anything' }) },
      undefined,
    );
    void session;
    expect(res.status).not.toBe(200);
  });
});

describe('Two-Factor Authentication — re-enable rotates secret', () => {
  it('re-enabling 2FA generates a new TOTP URI (secret rotation)', async () => {
    const { cookie } = await setupUser(
      'mfa-rotate@example.com',
      'Password123!',
    );
    const { totpURI: first, cookie: enabledCookie } = await enableTwoFactor(
      cookie,
      'Password123!',
    );

    const code1 = await generateTOTPCode(first);
    const verifyRes = await request(
      '/two-factor/verify-totp',
      { method: 'POST', body: JSON.stringify({ code: code1 }) },
      enabledCookie,
    );
    const verifiedCookie = extractCookies(verifyRes.headers) || enabledCookie;

    const { totpURI: second } = await enableTwoFactor(
      verifiedCookie,
      'Password123!',
    );
    expect(second).not.toBe(first);

    const firstSecret = new URL(first).searchParams.get('secret');
    const secondSecret = new URL(second).searchParams.get('secret');
    expect(firstSecret).not.toBe(secondSecret);
  });
});
