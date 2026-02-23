import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testAuth, testMailService } from './auth.setup.js';

const BASE_URL = 'http://localhost:3000/api/auth';

async function makeRequest(path: string, options: RequestInit = {}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(BASE_URL.replace(/\/$/, '') + cleanPath);
  const req = new Request(url.toString(), {
    headers: { 
      'Content-Type': 'application/json',
      'Host': 'localhost:3000',
      'Origin': 'http://localhost:3000'
    },
    ...options,
  });
  
  const res = await testAuth.handler(req);
  if (res.status === 404) {
     console.error("404 Request URL:", url.toString());
     console.error("404 Response text:", await res.clone().text());
  }
  if (res.status === 500) {
     console.error("500 Request URL:", url.toString());
     console.error("500 Response text:", await res.clone().text());
  }
  return res;
}

describe('Better Auth Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Test 1: Error when a user without a password logs in with an empty password', async () => {
    const ctx = await testAuth.$context;
    await ctx.adapter.create({
      model: "user",
      data: {
        name: 'OAuth User',
        email: 'oauth@example.com',
        emailVerified: true,
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
        updatedAt: new Date('2023-01-01T00:00:00.000Z')
      }
    });

    const res = await makeRequest('/sign-in/email', {
      method: 'POST',
      body: JSON.stringify({ email: 'oauth@example.com', password: '' }),
    });

    const body = await res.json() as { message?: string };
    
    expect(res.status).not.toBe(200);
    expect(body.message).toBeDefined();
  });

  it('Test 2: Successful login with correct email and password', async () => {
    const signupRes = await makeRequest('/sign-up/email', {
      method: 'POST',
      body: JSON.stringify({
        email: 'testlogin@example.com',
        password: 'securePassword123!',
        name: 'Test Login User',
      }),
    });
    expect(signupRes.status).toBe(200);
    const signupBody = await signupRes.json() as { user: { id: string } };

    const ctx = await testAuth.$context;
    await ctx.adapter.update({
      model: "user",
      where: [{ field: "id", value: signupBody.user.id }],
      update: { emailVerified: true }
    });

    const loginRes = await makeRequest('/sign-in/email', {
      method: 'POST',
      body: JSON.stringify({
        email: 'testlogin@example.com',
        password: 'securePassword123!',
      }),
    });

    expect(loginRes.status).toBe(200);
    const body = await loginRes.json() as { user?: { email: string } };
    expect(body.user).toBeDefined();
    expect(body.user?.email).toBe('testlogin@example.com');
  });

  it('Test 3: OAuth Authentication using a dummy external provider', async () => {
    const signinRes = await makeRequest('/sign-in/social', {
      method: 'POST',
      body: JSON.stringify({
        provider: 'dummy',
        callbackURL: 'http://localhost:3000/callback',
      }),
    });
    
    const body = await signinRes.json() as { url?: string };
    expect(body.url).toBeDefined();
    expect(body.url).toContain('https://dummy.com/auth');

    const cookies = signinRes.headers.get('set-cookie');

    const authUrl = new URL(body.url);
    const state = authUrl.searchParams.get('state');

    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn().mockImplementation(async (url: Request | string | URL, options?: RequestInit) => {
      const urlStr = url instanceof Request ? url.url : url.toString();
      if (urlStr.includes('dummy.com/token')) {
        return new Response(JSON.stringify({ access_token: 'dummy_access_token' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (urlStr.includes('dummy.com/userinfo')) {
        return new Response(JSON.stringify({
          id: 'dummy_user_1',
          name: 'Dummy User',
          email: 'dummy@example.com',
          email_verified: true
        }), {
           headers: { 'Content-Type': 'application/json' }
        });
      }
      return originalFetch(url, options);
    });

    try {
      const callbackRes = await makeRequest(`/oauth2/callback/dummy?state=${encodeURIComponent(state ?? '')}&code=valid_code`, {
        method: 'GET',
        headers: cookies ? { 'Cookie': cookies } : undefined
      });

      expect(callbackRes.status).toBe(302);
      expect(callbackRes.headers.get('location')).toBe('http://localhost:3000/callback');
      
      const setCookie = callbackRes.headers.get('set-cookie');
      expect(setCookie).toBeTruthy();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('Test 4: Requesting passkey authentication returns the correct challenge', async () => {
    const res = await makeRequest('/passkey/generate-authenticate-options', {
      method: 'GET',
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    
    expect(body.challenge).toBeDefined();
    expect(body.rpId).toBe('localhost'); 
  });

  it('Test 5: Mocked email sending function correctly sends authentication and OTP emails', async () => {
    const res = await makeRequest('/email-otp/send-verification-otp', {
      method: 'POST',
      body: JSON.stringify({
        email: 'otpuser@example.com',
        type: 'sign-in',
      }),
    });

    expect(res.status).toBe(200);
    
    expect(testMailService.sendEmail).toHaveBeenCalled();
    const mockCallArgs = vi.mocked(testMailService.sendEmail).mock.calls[0][0] as { to: string; subject: string; html: string };
    
    expect(mockCallArgs.to).toBe('otpuser@example.com');
    expect(mockCallArgs.subject).toBe('Your verification code');
    expect(mockCallArgs.html).toContain('Your verification code is:');
  });
});
