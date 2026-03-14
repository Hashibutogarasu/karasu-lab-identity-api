import { Injectable } from '@nestjs/common';
import { IConfigService } from '../shared/config/config.service.interface.js';
import { socialProviderConfigFactory } from '../services/auth/socialProvider/social-provider-config.service.js';
import { ISocialProviderConfig } from '../services/auth/socialProvider/social-provider-config.interface.js';
import { ProvidersResponseDto } from './dto/providers-response.dto.js';

@Injectable()
export class ProvidersService {
  private readonly socialProviderConfig: ISocialProviderConfig;

  constructor(private readonly configService: IConfigService) {
    this.socialProviderConfig = socialProviderConfigFactory(configService);
  }

  /**
   * Get all enabled authentication providers
   */
  getEnabledProviders(): ProvidersResponseDto {
    const providersMap = this.socialProviderConfig.getProviders();
    const providers = Object.keys(providersMap).map((id) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
    }));

    return { providers };
  }
}
