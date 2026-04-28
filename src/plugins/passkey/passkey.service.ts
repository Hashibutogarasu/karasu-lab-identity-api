import { IConfigService } from '../../shared/config/config.service.interface.js';
import type { ApiYamlConfig } from '../../utils/config.util.js';
import { IPasskeyAuth } from './passkey.interface.js';

export function passkeyAuthFactory(
  configService: IConfigService,
  yaml: ApiYamlConfig['passkey'],
): IPasskeyAuth {
  return {
    getOrigin(): string[] {
      const envOrigins =
        configService
          .getAll()
          .PASSKEY_ORIGIN?.split(',')
          .map((s) => s.trim()) ?? [];
      return Array.from(new Set([...envOrigins, ...yaml.origins]));
    },

    getRPID(): string {
      return configService.getAll().PASSKEY_RP_ID;
    },

    getRPName(): string {
      return configService.getAll().PASSKEY_RP_NAME;
    },
  };
}
