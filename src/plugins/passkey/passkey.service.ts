import { IPasskeyAuth } from "./passkey.interface.js";
import { IConfigService } from "../../shared/config/config.service.interface.js";
import { Environment } from "../../types/environment.js";

export class PasskeyAuth implements IPasskeyAuth {
    private readonly environment: Environment;

    constructor(
        private readonly configService: IConfigService,
    ) {
        const env = this.configService.getAll();
        this.environment = env.NODE_ENV as Environment;
    }

    getOrigin(): string[] {
        if (this.environment === Environment.PRODUCTION) {
            return ['https://sso.karasu256.com'];
        }
        return ['http://localhost:3000', 'https://sso.karasu256.com'];
    }

    getRPID(): string {
        const env = this.configService.getAll();
        return env.PASSKEY_RP_ID ?? "karasu256.com";
    }

    getRPName(): string {
        const env = this.configService.getAll();
        return env.PASSKEY_RP_NAME ?? "Karasu Lab";
    }
}
