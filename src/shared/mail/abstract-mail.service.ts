import { BaseEnvironmentConfig } from "../config/base-environment-config.js";
import { IMailService, SendEmailOptions } from "./mail.service.interface.js";

export abstract class AbstractMailService extends BaseEnvironmentConfig implements IMailService {
  constructor(environment: string) {
    super(environment);
  }

  abstract sendEmail(options: SendEmailOptions): Promise<void>;
}
