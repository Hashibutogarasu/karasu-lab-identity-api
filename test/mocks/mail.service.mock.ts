import { vi, Mock } from "vitest";
import { AbstractMailService } from "../../src/shared/mail/abstract-mail.service.js";
import { SendEmailOptions } from "../../src/shared/mail/mail.service.interface.js";

export class MockMailService extends AbstractMailService {
  constructor(environment: string = "test") {
    super(environment);
  }

  sendEmail: Mock<(options: SendEmailOptions) => Promise<void>> = vi.fn().mockImplementation(async (options: SendEmailOptions) => {
    return Promise.resolve();
  });
}
