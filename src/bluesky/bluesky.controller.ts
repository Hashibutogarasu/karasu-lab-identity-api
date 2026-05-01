import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { BlueskyService } from './bluesky.service.js';

@ApiTags('Bluesky')
@AllowAnonymous()
@Controller('bluesky/oauth')
export class BlueskyController {
  constructor(private readonly blueskyService: BlueskyService) {}

  @ApiOperation({
    summary: 'ATProto OAuth client metadata',
    description:
      'Returns the OAuth 2.0 client metadata document for the KarasuLab Android app. ' +
      'Fetched by the Bluesky authorization server to verify the client during the OAuth flow.',
  })
  @ApiResponse({ status: 200, description: 'Client metadata JSON document.' })
  @Get('client-metadata.json')
  getClientMetadata() {
    return this.blueskyService.getClientMetadata();
  }
}
