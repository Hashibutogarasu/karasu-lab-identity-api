import { IBetterAuthBootStrapper } from "./better-auth-bootstrapper.interface.js";
import { setupI18n } from "../shared/i18n/i18n.setup.js";

export class I18nBootStrapper implements IBetterAuthBootStrapper {
  async bootstrap(): Promise<void> {
    await setupI18n();
  }
}
