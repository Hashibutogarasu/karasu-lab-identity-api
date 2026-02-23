import { IPasskeyAuth } from "./passkey.interface.js";
import { IConfigService } from "../../shared/config/config.service.interface.js";
import { BaseEnvironmentConfig } from "../../shared/config/base-environment-config.js";
import { Environment } from "../../types/environment.js";

export abstract class AbstractPasskeyAuth extends BaseEnvironmentConfig implements IPasskeyAuth {
    constructor(
        protected readonly configService: IConfigService,
        environment: Environment
    ) {
        super(environment);
    }

    protected abstract getDefaultOrigins(): string[];

    getOrigin(): string[] {
        const env = this.configService.getAll();
        
        const origins: string[] = [];
        if (env.PASSKEY_ORIGIN) {
            origins.push(...env.PASSKEY_ORIGIN.split(',').map(s => s.trim()));
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

export class ProductionPasskeyAuth extends AbstractPasskeyAuth {
    constructor(configService: IConfigService) {
        super(configService, Environment.PRODUCTION);
    }

    protected getDefaultOrigins(): string[] {
        return [
            'https://sso.karasu256.com',
            'https://karasu256.com',
            'https://www.karasu256.com'
        ];
    }
}

export class DevelopmentPasskeyAuth extends AbstractPasskeyAuth {
    constructor(configService: IConfigService) {
        super(configService, Environment.DEVELOPMENT);
    }

    protected getDefaultOrigins(): string[] {
        return [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://sso.karasu256.com',
            'https://www.karasu256.com'
        ];
    }
}

export class TestPasskeyAuth extends AbstractPasskeyAuth {
    constructor(configService: IConfigService) {
        super(configService, Environment.TEST);
    }

    protected getDefaultOrigins(): string[] {
        return ['http://localhost:3001'];
    }
}

const passkeyAuthClasses: Record<Environment, new (configService: IConfigService) => IPasskeyAuth> = {
    [Environment.PRODUCTION]: ProductionPasskeyAuth,
    [Environment.DEVELOPMENT]: DevelopmentPasskeyAuth,
    [Environment.TEST]: TestPasskeyAuth
};

export function passkeyAuthFactory(configService: IConfigService): IPasskeyAuth {
    const PasskeyAuthClass = passkeyAuthClasses[configService.environment];
    return new PasskeyAuthClass(configService);
}
