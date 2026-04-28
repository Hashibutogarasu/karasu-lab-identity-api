import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { MinecraftService } from './minecraft.service.js';
import { MinecraftProfileDto } from '../user/dto/minecraft-profile.dto.js';
import { SessionService } from '../shared/auth/session.service.js';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user/minecraft')
export class MinecraftController {
  constructor(
    private readonly minecraftService: MinecraftService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'Get Minecraft profile of the current user' })
  @ApiResponse({
    status: 200,
    description: 'The Minecraft profile data.',
    type: MinecraftProfileDto,
  })
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<MinecraftProfileDto> {
    const { user } = await this.sessionService.requireSession(req);
    return this.minecraftService.getMinecraftProfile(user.id);
  }
}
