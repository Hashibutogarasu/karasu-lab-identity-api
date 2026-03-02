import { IMailService } from "../../../shared/mail/mail.service.interface.js";
import { IConfigService } from "../../../shared/config/config.service.interface.js";
import { getFrontendUrl } from "../../../utils.js";
import { IAuthNotificationService } from "./auth-notification.service.interface.js";

export class AuthNotificationService implements IAuthNotificationService {
  constructor(
    private mailService: IMailService,
    private configService: IConfigService
  ) {}

  private getFrontendUrl(): string {
    const env = this.configService.getAll();
    return env.FRONTEND_ORIGIN || getFrontendUrl();
  }

  async sendVerificationOTP({ email, otp, type }: {
    email: string;
    otp: string;
    type: string | null | undefined;
  }): Promise<void> {
    const frontendUrl = this.getFrontendUrl();
    const link = `${frontendUrl}/auth/email-verify?type=${encodeURIComponent(
      String(type ?? '')
    )}&email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;
    await this.mailService.sendEmail({
      to: email,
      subject: "Your verification code",
      html: `Your verification code is: <strong>${otp}</strong><br/><br/>Click to verify: <a href="${link}">${link}</a>`,
    });
  }

  async sendMagicLink({ email, token }: {
    email: string;
    token: string;
  }): Promise<void> {
    const frontendUrl = this.getFrontendUrl();
    const link = `${frontendUrl}/auth/email-verify?type=${encodeURIComponent(
      'magic-link'
    )}&email=${encodeURIComponent(email)}&otp=${encodeURIComponent(token)}`;
    await this.mailService.sendEmail({
      to: email,
      subject: "Your magic link",
      html: `Click the link to sign in: <a href="${link}">${link}</a>`,
    });
  }

  async sendVerificationEmail({ user, url }: {
    user: { email?: string };
    url: string;
  }): Promise<void> {
    if (!user.email) return;
    await this.mailService.sendEmail({
      to: user.email,
      subject: "Verify your email address",
      html: `Click the link to verify your email: <a href="${url}">${url}</a>`,
    });
  }

  async sendChangeEmailVerification({ newEmail, url }: {
    newEmail: string;
    url: string;
  }): Promise<void> {
    await this.mailService.sendEmail({
      to: newEmail,
      subject: "Confirm your new email address",
      html: `Click the link to confirm your new email address: <a href="${url}">${url}</a>`,
    });
  }
}

export function authNotificationServiceFactory(
  mailService: IMailService,
  configService: IConfigService
): IAuthNotificationService {
  return new AuthNotificationService(mailService, configService);
}
