export interface IAuthNotificationService {
  sendVerificationOTP(params: {
    email: string;
    otp: string;
    type: string | null | undefined;
  }): Promise<void>;

  sendMagicLink(params: {
    email: string;
    token: string;
  }): Promise<void>;

  sendVerificationEmail(params: {
    user: { email?: string };
    url: string;
  }): Promise<void>;

  sendChangeEmailVerification(params: {
    newEmail: string;
    url: string;
  }): Promise<void>;
}
