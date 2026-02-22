import { vi, Mock } from "vitest";
import { Environment } from "../../src/types/environment.js";
import { AbstractMailService } from "../../src/shared/mail/abstract-mail.service.js";
import { SendEmailOptions } from "../../src/shared/mail/mail.service.interface.js";

export class MockMailService extends AbstractMailService {
  constructor(environment: Environment = Environment.TEST) {
    super(environment);
  }

  sendEmail: Mock<(options: SendEmailOptions) => Promise<void>> = vi.fn().mockImplementation(async (options: SendEmailOptions) => {
    const to = Array.isArray(options.to) ? options.to.join(", ") : options.to;
    console.log(`[MockMailService] Sending email to ${to}: ${options.subject}`);
    return Promise.resolve();
  });
}
