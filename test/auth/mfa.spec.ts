import { describe, it, expect } from 'vitest';
import { testAuth } from './auth.setup.js';
import { createOTP } from '@better-auth/utils/otp';

const BASE_URL = 'http://localhost:3000/api/auth';

async function request(path: string, options: RequestInit = {}) {
  const url = BASE_URL + (path.startsWith('/') ? path : `/${path}`);
  const req = new Request(url, {
    headers: {
      'Content-Type': 'application/json',
      Host: 'localhost:3000',
      Origin: 'http://localhost:3000',
    },
    ...options,
  });
  return testAuth.handler(req);
}

async function setupUser(email: string, password: string): Promise<{ cookie: string; userId: string }> {
  const signUpRes = await request('/sign-up/email', {
    method: 'POST',
    body: JSON.stringify({ email, password, name: 'MFA Test User' }),
  });
  if (signUpRes.status !== 200) {
    throw new Error(`sign-up failed (${signUpRes.status}): ${await signUpRes.text()}`);
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
  if (signInRes.status !== 200) {
    throw new Error(`sign-in failed (${signInRes.status}): ${await signInRes.text()}`);
  }
  const cookie = signInRes.headers.get('set-cookie') ?? '';
  return { cookie, userId: user.id };
}

async function enableTwoFactor(cookie: string, password: string) {
  const res = await request('/two-factor/enable', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ password }),
  });
  if (res.status !== 200) {
    throw new Error(`enable 2FA failed (${res.status}): ${await res.text()}`);
  }
  return res.json() as Promise<{ totpURI: string; backupCodes: string[] }>;
}

async function generateTOTPCode(totpURI: string): Promise<string> {
  const url = new URL(totpURI);
  const secret = url.searchParams.get('secret') ?? '';
  return createOTP(secret, { digits: 6, period: 30 }).totp();
}

async function signIn(email: string, password: string) {
  const res = await request('/sign-in/email', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return { res, cookie: res.headers.get('set-cookie') ?? '' };
}

describe('Two-Factor Authentication — enable and disable', () => {
  it('enables 2FA for a verified user and returns totpURI and backup codes', async () => {
    const { cookie } = await setupUser('mfa-enable@example.com', 'Password123!');
    const { totpURI, backupCodes } = await enableTwoFactor(cookie, 'Password123!');

    expect(totpURI).toMatch(/^otpauth:\/\/totp\//);
    expect(Array.isArray(backupCodes)).toBe(true);
    expect(backupCodes.length).toBeGreaterThan(0);
  });

  it('rejects enabling 2FA with wrong password', async () => {
    const { cookie } = await setupUser('mfa-enable-wrong-pw@example.com', 'Password123!');
    const res = await request('/two-factor/enable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ password: 'WrongPassword!' }),
    });
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
    const { cookie } = await setupUser('mfa-disable@example.com', 'Password123!');
    const { totpURI } = await enableTwoFactor(cookie, 'Password123!');

    const code = await generateTOTPCode(totpURI);
    const verifyRes = await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code }),
    });
    expect(verifyRes.status).toBe(200);

    const disableRes = await request('/two-factor/disable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: verifyRes.headers.get('set-cookie') ?? cookie },
      body: JSON.stringify({ password: 'Password123!' }),
    });
    expect(disableRes.status).toBe(200);
    const body = await disableRes.json() as { status: boolean };
    expect(body.status).toBe(true);
  });

  it('rejects disabling 2FA with wrong password', async () => {
    const { cookie } = await setupUser('mfa-disable-wrong-pw@example.com', 'Password123!');
    await enableTwoFactor(cookie, 'Password123!');

    const res = await request('/two-factor/disable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ password: 'BadPassword!' }),
    });
    expect(res.status).not.toBe(200);
  });
});

describe('Two-Factor Authentication — sign-in flow', () => {
  it('returns twoFactorRedirect and does NOT set a session cookie when 2FA is enabled', async () => {
    const { cookie } = await setupUser('mfa-signin-block@example.com', 'Password123!');
    const { totpURI } = await enableTwoFactor(cookie, 'Password123!');

    const code = await generateTOTPCode(totpURI);
    const verifyRes = await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code }),
    });
    expect(verifyRes.status).toBe(200);

    const { res, cookie: twoFactorCookie } = await signIn('mfa-signin-block@example.com', 'Password123!');
    const body = await res.json() as { twoFactorRedirect?: boolean };

    expect(res.status).toBe(200);
    expect(body.twoFactorRedirect).toBe(true);

    expect(twoFactorCookie).toBeTruthy();
    expect(twoFactorCookie).not.toContain('better-auth.session_token');
  });

  it('completes sign-in by verifying TOTP and issues a session cookie', async () => {
    const { cookie } = await setupUser('mfa-signin-complete@example.com', 'Password123!');
    const { totpURI } = await enableTwoFactor(cookie, 'Password123!');

    const activateCode = await generateTOTPCode(totpURI);
    await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code: activateCode }),
    });

    const { cookie: tfCookie } = await signIn('mfa-signin-complete@example.com', 'Password123!');

    const code = await generateTOTPCode(totpURI);
    const finalRes = await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tfCookie },
      body: JSON.stringify({ code }),
    });
    expect(finalRes.status).toBe(200);
    expect(finalRes.headers.get('set-cookie')).toBeTruthy();
  });

  it('rejects TOTP verification with an invalid code', async () => {
    const { cookie } = await setupUser('mfa-invalid-code@example.com', 'Password123!');
    const { totpURI } = await enableTwoFactor(cookie, 'Password123!');

    const activateCode = await generateTOTPCode(totpURI);
    await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code: activateCode }),
    });

    const { cookie: tfCookie } = await signIn('mfa-invalid-code@example.com', 'Password123!');

    const res = await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tfCookie },
      body: JSON.stringify({ code: '000000' }),
    });
    expect(res.status).not.toBe(200);
    const body = await res.json() as { message?: string; code?: string };
    expect(body.code ?? body.message).toBeTruthy();
  });

  it('rejects TOTP verification with an empty code', async () => {
    const { cookie } = await setupUser('mfa-empty-code@example.com', 'Password123!');
    const { totpURI } = await enableTwoFactor(cookie, 'Password123!');

    const activateCode = await generateTOTPCode(totpURI);
    await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code: activateCode }),
    });

    const { cookie: tfCookie } = await signIn('mfa-empty-code@example.com', 'Password123!');

    const res = await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tfCookie },
      body: JSON.stringify({ code: '' }),
    });
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
    const { cookie } = await setupUser('mfa-backup-valid@example.com', 'Password123!');
    const { totpURI, backupCodes } = await enableTwoFactor(cookie, 'Password123!');

    const code = await generateTOTPCode(totpURI);
    await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code }),
    });

    const { cookie: tfCookie } = await signIn('mfa-backup-valid@example.com', 'Password123!');

    const res = await request('/two-factor/verify-backup-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tfCookie },
      body: JSON.stringify({ code: backupCodes[0] }),
    });
    expect(res.status).toBe(200);
  });

  it('rejects an invalid backup code', async () => {
    const { cookie } = await setupUser('mfa-backup-invalid@example.com', 'Password123!');
    const { totpURI } = await enableTwoFactor(cookie, 'Password123!');

    const code = await generateTOTPCode(totpURI);
    await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code }),
    });

    const { cookie: tfCookie } = await signIn('mfa-backup-invalid@example.com', 'Password123!');

    const res = await request('/two-factor/verify-backup-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tfCookie },
      body: JSON.stringify({ code: 'XXXXX-XXXXX' }),
    });
    expect(res.status).not.toBe(200);
  });

  it('rejects reuse of an already-consumed backup code', async () => {
    const { cookie } = await setupUser('mfa-backup-reuse@example.com', 'Password123!');
    const { totpURI, backupCodes } = await enableTwoFactor(cookie, 'Password123!');

    const activateCode = await generateTOTPCode(totpURI);
    await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code: activateCode }),
    });

    const { cookie: tfCookie1 } = await signIn('mfa-backup-reuse@example.com', 'Password123!');
    const first = await request('/two-factor/verify-backup-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tfCookie1 },
      body: JSON.stringify({ code: backupCodes[0] }),
    });
    expect(first.status).toBe(200);

    const { cookie: tfCookie2 } = await signIn('mfa-backup-reuse@example.com', 'Password123!');
    const second = await request('/two-factor/verify-backup-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: tfCookie2 },
      body: JSON.stringify({ code: backupCodes[0] }),
    });
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
    const { cookie } = await setupUser('mfa-get-uri@example.com', 'Password123!');
    await enableTwoFactor(cookie, 'Password123!');

    const res = await request('/two-factor/get-totp-uri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ password: 'Password123!' }),
    });
    expect(res.status).toBe(200);
    const body = await res.json() as { totpURI: string };
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
    const { cookie } = await setupUser('mfa-get-uri-wrong-pw@example.com', 'Password123!');
    await enableTwoFactor(cookie, 'Password123!');

    const res = await request('/two-factor/get-totp-uri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ password: 'Wrong!' }),
    });
    expect(res.status).not.toBe(200);
  });

  it('rejects get-totp-uri for a user who has not configured 2FA', async () => {
    const { cookie } = await setupUser('mfa-get-uri-no2fa@example.com', 'Password123!');

    const res = await request('/two-factor/get-totp-uri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ password: 'Password123!' }),
    });
    expect(res.status).not.toBe(200);
  });
});

describe('Password verify endpoint — /api/auth/password/verify', () => {
  it('returns true for the correct password (credential account)', async () => {
    const { cookie } = await setupUser('pw-verify-correct@example.com', 'Password123!');
    const res = await request('/password/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ password: 'Password123!' }),
    });
    expect(res.status).toBe(200);
    const body = await res.json() as boolean;
    expect(body).toBe(true);
  });

  it('returns false for an incorrect password', async () => {
    const { cookie } = await setupUser('pw-verify-wrong@example.com', 'Password123!');
    const res = await request('/password/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ password: 'WrongPassword!' }),
    });
    expect(res.status).toBe(200);
    const body = await res.json() as boolean;
    expect(body).toBe(false);
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

    const session = await ctx.internalAdapter.createSession((oauthUser as { id: string }).id);
    const signedCookie = await (async () => {
      const cookieRes = await request('/get-session', {
        method: 'GET',
        headers: { Authorization: `Bearer ${session.token}` },
      });
      return cookieRes.headers.get('set-cookie') ?? '';
    })();

    const res = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(signedCookie ? { Cookie: signedCookie } : { Authorization: `Bearer ${session.token}` }),
      },
      body: JSON.stringify({ password: 'anything' }),
    });
    // Expect an error because the user has no credential account
    expect(res.status).not.toBe(200);
  });
});

describe('Two-Factor Authentication — re-enable rotates secret', () => {
  it('re-enabling 2FA generates a new TOTP URI (secret rotation)', async () => {
    const { cookie } = await setupUser('mfa-rotate@example.com', 'Password123!');
    const { totpURI: first } = await enableTwoFactor(cookie, 'Password123!');

    const code1 = await generateTOTPCode(first);
    await request('/two-factor/verify-totp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ code: code1 }),
    });

    const { totpURI: second } = await enableTwoFactor(cookie, 'Password123!');
    expect(second).not.toBe(first);

    const firstSecret = new URL(first).searchParams.get('secret');
    const secondSecret = new URL(second).searchParams.get('secret');
    expect(firstSecret).not.toBe(secondSecret);
  });
});
