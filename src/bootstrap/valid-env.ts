/* eslint-disable @typescript-eslint/require-await */
import { IBetterAuthBootStrapper } from "./better-auth-bootstrapper.interface.js";
import { AuthBootstrapContext } from "./auth-bootstrap.context.js";
import { EnvironmentUtils } from "@hashibutogarasu/common";
import { emailConfig } from "../config/email.env.js";
import { createAPIError, ErrorCodes } from "../shared/errors/error.codes.js";

export class ValidEnv implements IBetterAuthBootStrapper {
  constructor(private context: AuthBootstrapContext) {}

  async bootstrap(): Promise<void> {
    if (this.context.auth || !this.context.authEnv) return;

    if (EnvironmentUtils.isProduction(this.context.authEnv.environment) && !emailConfig.RESEND_API_KEY) {
      throw createAPIError(ErrorCodes.SYSTEM.RESEND_API_KEY_REQUIRED);
    }
  }
}
