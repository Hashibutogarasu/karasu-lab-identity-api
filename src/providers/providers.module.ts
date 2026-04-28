import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller.js';
import { ProvidersService } from './providers.service.js';
import { ConfigServiceProvider } from '../shared/config/config.service.js';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, ConfigServiceProvider],
  exports: [ProvidersService, ConfigServiceProvider],
})
export class ProvidersModule {}
