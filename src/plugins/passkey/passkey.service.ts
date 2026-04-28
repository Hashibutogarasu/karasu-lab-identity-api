import { IPasskeyAuth } from './passkey.interface.js';
import { IConfigService } from '../../shared/config/config.service.interface.js';
import { loadApiConfig } from '../../utils/config.util.js';
import { AbstractEnvironment, Environment } from '@hashibutogarasu/common';

export abstract class AbstractPasskeyAuth
  extends AbstractEnvironment
  implements IPasskeyAuth
{
  constructor(
    protected readonly configService: IConfigService,
    environment: Environment,
  ) {
    super(environment);
  }

  protected abstract getDefaultOrigins(): string[];

  getOrigin(): string[] {
    const env = this.configService.getAll();

    const origins: string[] = [];
    if (env.PASSKEY_ORIGIN) {
      origins.push(...env.PASSKEY_ORIGIN.split(',').map((s) => s.trim()));
    }

    origins.push(...this.getDefaultOrigins());

    return Array.from(new Set(origins));
  }

  getRPID(): string {
    const env = this.configService.getAll();
    return env.PASSKEY_RP_ID;
  }

  getRPName(): string {
    const env = this.configService.getAll();
    return env.PASSKEY_RP_NAME;
  }
}

export class YamlPasskeyAuth extends AbstractPasskeyAuth {
  constructor(configService: IConfigService) {
    super(configService, configService.environment);
  }

  protected getDefaultOrigins(): string[] {
    return loadApiConfig(this.environment).passkey.origins;
  }
}

export function passkeyAuthFactory(
  configService: IConfigService,
): IPasskeyAuth {
  return new YamlPasskeyAuth(configService);
}
