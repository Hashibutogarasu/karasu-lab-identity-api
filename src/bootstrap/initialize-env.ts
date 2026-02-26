/* eslint-disable @typescript-eslint/require-await */
import { IBetterAuthBootStrapper } from "./better-auth-bootstrapper.interface.js";
import { AuthBootstrapContext } from "./auth-bootstrap.context.js";
import { AuthEnvironment } from "../auth-environment.js";
import { authConfig } from "../config/auth.env.js";
import { EnvironmentUtils } from "@hashibutogarasu/common";
import type { Auth as BetterAuthType } from "better-auth";

export class InitializeEnv implements IBetterAuthBootStrapper {
  constructor(private context: AuthBootstrapContext) {}

  async bootstrap(): Promise<void> {
    this.context.authEnv = new AuthEnvironment(authConfig.NODE_ENV);

    if (EnvironmentUtils.isTest(this.context.authEnv.environment)) {
      this.context.auth = {} as unknown as BetterAuthType;
    }
  }
}
