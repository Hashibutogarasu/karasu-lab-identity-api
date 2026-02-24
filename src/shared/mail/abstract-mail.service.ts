import { AbstractEnvironment } from "../config/abstract-environment.js";
import { IMailService, SendEmailOptions } from "./mail.service.interface.js";

export abstract class AbstractMailService extends AbstractEnvironment implements IMailService {
  constructor(environment: string) {
    super(environment);
  }

  abstract sendEmail(options: SendEmailOptions): Promise<void>;
}
