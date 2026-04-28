import { Module } from '@nestjs/common';
import { MinecraftController } from './minecraft.controller.js';
import { MinecraftService } from './minecraft.service.js';

import { SessionModule } from '../shared/auth/session.module.js';

import { ProvidersModule } from '../providers/providers.module.js';

@Module({
  imports: [SessionModule, ProvidersModule],
  controllers: [MinecraftController],
  providers: [MinecraftService],
  exports: [MinecraftService],
})
export class MinecraftModule {}
