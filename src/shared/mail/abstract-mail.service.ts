import { Environment } from "../../types/environment.js";
import { IMailService, SendEmailOptions } from "./mail.service.interface.js";

export abstract class AbstractMailService implements IMailService {
  protected environment: Environment;

  constructor(environment: Environment) {
    this.environment = environment;
  }

  abstract sendEmail(options: SendEmailOptions): Promise<void>;
}
