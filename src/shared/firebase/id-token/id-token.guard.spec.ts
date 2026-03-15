/* eslint-disable @typescript-eslint/unbound-method */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { IdTokenGuard } from "./id-token.guard.js";
import { SessionService } from "../../auth/session.service.js";
import { ExecutionContext } from "@nestjs/common";
import { getAuth } from "firebase-admin/auth";
import { ErrorCodes } from "../../errors/error.codes.js";

vi.mock("firebase-admin/auth", () => ({
  getAuth: vi.fn(),
}));

describe('IdTokenGuard', () => {
  let guard: IdTokenGuard;
  let sessionService: SessionService;
  let mockContext: ExecutionContext;

  beforeEach(() => {
    sessionService = {
      requireSession: vi.fn(),
    } as any;
    guard = new IdTokenGuard(sessionService);

    mockContext = {
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({ headers: {} }),
      }),
    } as any;
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw UNAUTHORIZED if session is missing', async () => {
    vi.mocked(sessionService.requireSession).mockResolvedValue(null as any);

    await expect(guard.canActivate(mockContext)).rejects.toEqual(ErrorCodes.AUTH.UNAUTHORIZED);
  });

  it('should throw UNAUTHORIZED if firebaseIdToken is missing in session', async () => {
    vi.mocked(sessionService.requireSession).mockResolvedValue({ user: {}, session: {} } as any);

    await expect(guard.canActivate(mockContext)).rejects.toEqual(ErrorCodes.AUTH.UNAUTHORIZED);
  });

  it('should return true if firebaseIdToken is valid', async () => {
    vi.mocked(sessionService.requireSession).mockResolvedValue({ 
      user: {}, 
      session: {}, 
      firebaseIdToken: 'valid-token' 
    } as any);

    const mockVerifyIdToken = vi.fn().mockResolvedValue({ uid: 'user-id' });
    vi.mocked(getAuth).mockReturnValue({
      verifyIdToken: mockVerifyIdToken,
    } as any);

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(mockVerifyIdToken).toHaveBeenCalledWith('valid-token');
  });

  it('should throw UNAUTHORIZED if firebaseIdToken is invalid', async () => {
    vi.mocked(sessionService.requireSession).mockResolvedValue({ 
      user: {}, 
      session: {}, 
      firebaseIdToken: 'invalid-token' 
    } as any);

    vi.mocked(getAuth).mockReturnValue({
      verifyIdToken: vi.fn().mockRejectedValue(new Error('Invalid token')),
    } as any);

    await expect(guard.canActivate(mockContext)).rejects.toEqual(ErrorCodes.AUTH.UNAUTHORIZED);
  });
});
