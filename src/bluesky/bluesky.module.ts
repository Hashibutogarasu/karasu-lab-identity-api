import { Module } from '@nestjs/common';
import { BlueskyController } from './bluesky.controller.js';
import { BlueskyService } from './bluesky.service.js';
import { ConfigServiceProvider } from '../shared/config/config.service.js';

@Module({
  controllers: [BlueskyController],
  providers: [BlueskyService, ConfigServiceProvider],
})
export class BlueskyModule {}
