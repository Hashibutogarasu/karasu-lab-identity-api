import { vi, Mock } from "vitest";
import { IAuthNotificationService } from "../../src/services/auth/auth-notification.service.interface.js";

export class MockAuthNotificationService implements IAuthNotificationService {
  sendVerificationOTP: Mock = vi.fn().mockResolvedValue(undefined);
  sendMagicLink: Mock = vi.fn().mockResolvedValue(undefined);
  sendVerificationEmail: Mock = vi.fn().mockResolvedValue(undefined);
  sendChangeEmailVerification: Mock = vi.fn().mockResolvedValue(undefined);
}
