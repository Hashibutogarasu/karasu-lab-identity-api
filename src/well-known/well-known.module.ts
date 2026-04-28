import { Module } from '@nestjs/common';
import { WellKnownController } from './well-known.controller.js';
import { WellKnownService } from './well-known.service.js';
import { ConfigServiceProvider } from '../shared/config/config.service.js';

@Module({
  controllers: [WellKnownController],
  providers: [WellKnownService, ConfigServiceProvider],
})
export class WellKnownModule {}
