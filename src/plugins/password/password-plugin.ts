import { BetterAuthPlugin } from "better-auth"
import { VerifyPasswordEndpoint, SetPasswordEndpoint } from "./password-endpoints.js";

export const passwordPlugin = (): BetterAuthPlugin => {
  return {
    id: "password",
    endpoints: {
      verify: new VerifyPasswordEndpoint().getEndpoint(),
      set: new SetPasswordEndpoint().getEndpoint(),
    }
  } satisfies BetterAuthPlugin
}
