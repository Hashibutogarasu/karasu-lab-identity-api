import { BetterAuthPlugin } from "better-auth";
import { passkey } from "@better-auth/passkey";
import { IPasskeyAuth } from "./passkey.interface.js";

export const passkeyPlugin = (passkeyAuth: IPasskeyAuth): BetterAuthPlugin => {
  return passkey({
    rpID: passkeyAuth.getRPID(),
    rpName: passkeyAuth.getRPName(),
    origin: passkeyAuth.getOrigin(),
  }) as BetterAuthPlugin;
};
