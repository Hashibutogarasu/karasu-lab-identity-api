import { Injectable } from '@nestjs/common';
import { IConfigService } from '../shared/config/config.service.interface.js';
import { getApiConfig } from '../utils/config.util.js';

interface BlueskyClientMetadata {
  client_id: string;
  client_name: string;
  client_uri: string;
  redirect_uris: string[];
  grant_types: string[];
  response_types: string[];
  scope: string;
  token_endpoint_auth_method: string;
  application_type: string;
  dpop_bound_access_tokens: boolean;
}

/** Builds the ATProto OAuth client metadata document for the KarasuLab Android app. */
@Injectable()
export class BlueskyService {
  constructor(private readonly configService: IConfigService) {}

  getClientMetadata(): BlueskyClientMetadata {
    const baseUrl = this.configService.get('BETTER_AUTH_URL');
    const clientId = `${baseUrl}/api/bluesky/oauth/client-metadata.json`;
    const redirectUri = getApiConfig().bluesky.redirectUri;

    return {
      client_id: clientId,
      client_name: 'KarasuLab',
      client_uri: baseUrl,
      redirect_uris: [redirectUri],
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      scope: 'atproto transition:generic',
      token_endpoint_auth_method: 'none',
      application_type: 'native',
      dpop_bound_access_tokens: true,
    };
  }
}
