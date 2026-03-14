import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { ProvidersService } from './providers.service.js';
import { ProvidersResponseDto } from './dto/providers-response.dto.js';

@ApiTags('Authentication')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  /**
   * Get available authentication providers.
   * This endpoint is public and used by the login page to show supported social providers.
   */
  @AllowAnonymous()
  @ApiOperation({ summary: 'List available authentication providers' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of available authentication providers.',
    type: ProvidersResponseDto,
  })
  @Get()
  getProviders(): ProvidersResponseDto {
    return this.providersService.getEnabledProviders();
  }
}
