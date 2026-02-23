import { IPasskeyAuth } from "./passkey.interface.js";
import { IConfigService } from "../../shared/config/config.service.interface.js";
import { BaseEnvironmentConfig } from "../../shared/config/base-environment-config.js";

export class PasskeyAuth extends BaseEnvironmentConfig implements IPasskeyAuth {
    constructor(
        private readonly configService: IConfigService,
    ) {
        const env = configService.getAll();
        super(env.NODE_ENV);
    }

    getOrigin(): string[] {
        const env = this.configService.getAll();
        
        if (env.PASSKEY_ORIGIN) {
            return [env.PASSKEY_ORIGIN];
        }
        
        if (this.isProduction()) {
            return [
                'https://sso.karasu256.com',
                'https://karasu256.com',
                'https://www.karasu256.com'
            ];
        }
        if (this.isTest()) {
            return ['http://localhost:3001'];
        }
        return [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://sso.karasu256.com',
            'https://www.karasu256.com'
        ];
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
