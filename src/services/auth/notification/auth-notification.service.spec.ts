import { describe, it, expect, beforeEach } from 'vitest';
import { MockConfigService } from '../../../../test/mocks/config.service.mock.js';
import { MockMailService } from '../../../../test/mocks/mail.service.mock.js';
import { AuthNotificationService, authNotificationServiceFactory } from './auth-notification.service.js';

describe('AuthNotificationService', () => {
  let mailService: MockMailService;
  let configService: MockConfigService;
  let service: AuthNotificationService;

  beforeEach(() => {
    mailService = new MockMailService('test');
    configService = new MockConfigService({
      NODE_ENV: 'test',
      FRONTEND_ORIGIN: 'http://localhost:3000',
    }, 'test');
    service = new AuthNotificationService(mailService, configService);
  });

  describe('sendVerificationOTP', () => {
    it('should send an email containing the OTP and a verification link', async () => {
      await service.sendVerificationOTP({ email: 'test@example.com', otp: '123456', type: 'sign-in' });

      expect(mailService.sendEmail).toHaveBeenCalledOnce();
      const args = mailService.sendEmail.mock.calls[0][0];
      expect(args.to).toBe('test@example.com');
      expect(args.subject).toBe('Your verification code');
      expect(args.html).toContain('123456');
      expect(args.html).toContain('http://localhost:3000');
    });

    it('should not throw when type is null', async () => {
      await expect(
        service.sendVerificationOTP({ email: 'test@example.com', otp: '123456', type: null })
      ).resolves.not.toThrow();
    });

    it('should use FRONTEND_ORIGIN from config in the verification link', async () => {
      const customConfigService = new MockConfigService({
        NODE_ENV: 'test',
        FRONTEND_ORIGIN: 'https://custom.example.com',
      }, 'test');
      const customService = new AuthNotificationService(mailService, customConfigService);

      await customService.sendVerificationOTP({ email: 'test@example.com', otp: '123456', type: 'sign-in' });

      const args = mailService.sendEmail.mock.calls[0][0];
      expect(args.html).toContain('https://custom.example.com');
    });
  });

  describe('sendMagicLink', () => {
    it('should send an email containing the magic link token', async () => {
      await service.sendMagicLink({ email: 'test@example.com', token: 'my-token' });

      expect(mailService.sendEmail).toHaveBeenCalledOnce();
      const args = mailService.sendEmail.mock.calls[0][0];
      expect(args.subject).toBe('Your magic link');
      expect(args.html).toContain('my-token');
    });

    it('should include type=magic-link in the link', async () => {
      await service.sendMagicLink({ email: 'test@example.com', token: 'my-token' });

      const args = mailService.sendEmail.mock.calls[0][0];
      expect(args.html).toContain('magic-link');
    });
  });

  describe('sendVerificationEmail', () => {
    it('should send a verification link to user.email', async () => {
      await service.sendVerificationEmail({
        user: { email: 'user@example.com' },
        url: 'https://verify.example.com/token',
      });

      expect(mailService.sendEmail).toHaveBeenCalledOnce();
      const args = mailService.sendEmail.mock.calls[0][0];
      expect(args.to).toBe('user@example.com');
      expect(args.subject).toBe('Verify your email address');
      expect(args.html).toContain('https://verify.example.com/token');
    });
  });

  describe('sendChangeEmailVerification', () => {
    it('should send a confirmation link to newEmail', async () => {
      await service.sendChangeEmailVerification({
        newEmail: 'new@example.com',
        url: 'https://confirm.example.com/token',
      });

      expect(mailService.sendEmail).toHaveBeenCalledOnce();
      const args = mailService.sendEmail.mock.calls[0][0];
      expect(args.to).toBe('new@example.com');
    });
  });

  describe('authNotificationServiceFactory', () => {
    it('should return an AuthNotificationService instance', () => {
      const instance = authNotificationServiceFactory(mailService, configService);

      expect(instance).toBeInstanceOf(AuthNotificationService);
    });
  });
});
