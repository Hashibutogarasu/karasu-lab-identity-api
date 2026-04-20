import { describe, it, expect } from 'vite-plus/test';
import { testAuth } from './auth/auth.setup.js';

const BASE_URL = 'http://localhost:3000/api/auth';

async function request(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
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

/**
 * Creates a user with email and password, marks email as verified, and signs in.
 * Returns the session cookie string.
 */
async function createVerifiedUserAndSignIn(
  email: string,
  password: string,
): Promise<string> {
  const signUpRes = await request('/sign-up/email', {
    method: 'POST',
    body: JSON.stringify({ email, password, name: 'Test User' }),
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

  const cookie = signInRes.headers.get('set-cookie');
  if (!cookie) {
    throw new Error(
      `sign-in returned no set-cookie (${signInRes.status}): ${await signInRes.text()}`,
    );
  }

  return cookie;
}

/**
 * Creates a user via sign-up, verifies email, and signs in,
 * then removes the credential account to simulate a social-login-only user.
 * Returns the session cookie string that can be used directly as a Cookie header.
 */
async function createSocialOnlyUserWithSession(email: string): Promise<string> {
  const tempPassword = 'Temp@Password9999';
  const cookie = await createVerifiedUserAndSignIn(email, tempPassword);

  const ctx = await testAuth.$context;
  const users: Array<{ id: string }> = await ctx.adapter.findMany({
    model: 'user',
    where: [{ field: 'email', value: email }],
  });
  const userId = users[0]?.id;

  if (!userId) {
    throw new Error(`user not found for email: ${email}`);
  }

  const accounts: Array<{ id: string; providerId: string }> =
    await ctx.adapter.findMany({
      model: 'account',
      where: [{ field: 'userId', value: userId }],
    });

  for (const account of accounts) {
    if (account.providerId === 'credential') {
      await ctx.adapter.delete({
        model: 'account',
        where: [{ field: 'id', value: account.id }],
      });
    }
  }

  return cookie;
}

describe('Password Plugin Integration Tests', () => {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  it('Returns 401 Unauthorized when verifying password without a session (even if the password happens to match)', async () => {
    const email = `session-none-target-${uid}@example.com`;
    const password = 'Target@Password123';
    await createVerifiedUserAndSignIn(email, password);

    const res = await request('/password/verify', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    expect(res.status).toBe(401);
  });

  it('Returns an error when a user without a password (no credential account) attempts password verification', async () => {
    const email = `social-only-${uid}@example.com`;
    const cookie = await createSocialOnlyUserWithSession(email);

    const res = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: cookie,
      },
      body: JSON.stringify({ password: 'SomePassword123' }),
    });

    const body = (await res.json()) as { message?: string };
    expect(res.status).toBe(400);
    expect(body.message).toBeDefined();
  });

  it('Returns true when a credential user verifies with the correct password', async () => {
    const email = `credential-ok-${uid}@example.com`;
    const password = 'CredUser@Pass123';
    const cookie = await createVerifiedUserAndSignIn(email, password);

    const res = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: cookie,
      },
      body: JSON.stringify({ password }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toBe(true);
  });

  it('A user without a password receives a different error than a credential user', async () => {
    const credEmail = `cred-compare-${uid}@example.com`;
    const credPassword = 'CredPass@456';
    const credCookie = await createVerifiedUserAndSignIn(
      credEmail,
      credPassword,
    );

    const socialEmail = `social-compare-${uid}@example.com`;
    const socialCookie = await createSocialOnlyUserWithSession(socialEmail);

    const credRes = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: credCookie,
      },
      body: JSON.stringify({ password: credPassword }),
    });
    expect(credRes.status).toBe(200);

    const socialRes = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: socialCookie,
      },
      body: JSON.stringify({ password: credPassword }),
    });
    expect(socialRes.status).toBe(400);
    const socialBody = (await socialRes.json()) as { message?: string };
    expect(socialBody.message).toBeDefined();
  });

  it('Two users sharing the same password can each verify correctly via their own session (session isolation)', async () => {
    const sharedPassword = 'Shared@Pass789';

    const emailA = `shared-user-a-${uid}@example.com`;
    const emailB = `shared-user-b-${uid}@example.com`;

    const cookieA = await createVerifiedUserAndSignIn(emailA, sharedPassword);
    const cookieB = await createVerifiedUserAndSignIn(emailB, sharedPassword);

    const resA = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: cookieA,
      },
      body: JSON.stringify({ password: sharedPassword }),
    });

    const resB = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: cookieB,
      },
      body: JSON.stringify({ password: sharedPassword }),
    });

    expect(resA.status).toBe(200);
    expect(await resA.json()).toBe(true);

    expect(resB.status).toBe(200);
    expect(await resB.json()).toBe(true);

    const wrongRes = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: cookieA,
      },
      body: JSON.stringify({ password: 'WrongPassword999!' }),
    });

    expect(wrongRes.status).not.toBe(200);
  });

  it('Returns an error when the wrong password is entered', async () => {
    const email = `wrong-pw-${uid}@example.com`;
    const correctPassword = 'Correct@Pass123';
    const cookie = await createVerifiedUserAndSignIn(email, correctPassword);

    const res = await request('/password/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Host: 'localhost:3000',
        Origin: 'http://localhost:3000',
        Cookie: cookie,
      },
      body: JSON.stringify({ password: 'WrongPassword999!' }),
    });

    const body = (await res.json()) as { message?: string };
    expect(res.status).toBe(401);
    expect(body.message).toBeDefined();
  });
});
