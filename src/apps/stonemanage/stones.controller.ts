import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { SessionService } from '../../shared/auth/session.service.js';
import { RolesGuard } from '../../shared/auth/roles.guard.js';
import { StonesService } from './stones.service.js';
import { CreateStoneDto, createStoneSchema } from './dto/create-stone.dto.js';
import { UpdateStoneDto, updateStoneSchema } from './dto/update-stone.dto.js';
import { StoneResponseDto } from './dto/stone-response.dto.js';
import { SuccessResponseDto } from '../../shared/dto/success-response.dto.js';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { Pagination } from '../../shared/decorators/pagination.decorator.js';
import { BasePaginationQueryDto } from '../../shared/dto/pagination-query.dto.js';

@UseGuards(RolesGuard, AuthGuard)
@ApiTags('Stone Manage Stones')
@Controller('apps/stonemanage')
export class StoneManageStonesController {
  constructor(
    private readonly service: StonesService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'List all stones for the user' })
  @ApiResponse({
    status: 200,
    description:
      'Returns all stones across all games for the authenticated user.',
    type: [StoneResponseDto],
  })
  @Get('stone')
  async listAllStones(
    @Req() req: Request,
    @Pagination() query: BasePaginationQueryDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.getStones(user.id, query);
  }

  @ApiOperation({ summary: 'Create a new stone in a game' })
  @ApiResponse({
    status: 201,
    description: 'The stone has been successfully created.',
    type: StoneResponseDto,
  })
  @Post('stone/:gid')
  async createStone(
    @Req() req: Request,
    @Param('gid') gid: string,
    @Body(new ZodValidationPipe(createStoneSchema)) dto: CreateStoneDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.createStone(gid, user.id, dto);
  }

  @ApiOperation({ summary: 'Get a specific stone in a game' })
  @ApiResponse({
    status: 200,
    description: 'Return the stone data.',
    type: StoneResponseDto,
  })
  @Get('stone/:gid/:sid')
  async getStone(
    @Req() req: Request,
    @Param('gid') gid: string,
    @Param('sid') sid: string,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.getStone(gid, sid, user.id);
  }

  @ApiOperation({ summary: 'Update a specific stone' })
  @ApiResponse({
    status: 200,
    description: 'The stone metadata has been successfully updated.',
    type: StoneResponseDto,
  })
  @Put('stone/:gid/:sid')
  async updateStone(
    @Req() req: Request,
    @Param('gid') gid: string,
    @Param('sid') sid: string,
    @Body(new ZodValidationPipe(updateStoneSchema)) dto: UpdateStoneDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.updateStone(gid, sid, user.id, dto);
  }

  @ApiOperation({ summary: 'Delete all stones in a game' })
  @ApiResponse({
    status: 200,
    description: 'The game stones have been successfully deleted.',
    type: SuccessResponseDto,
  })
  @Delete('stone/:gid')
  async deleteStonesByGame(@Req() req: Request, @Param('gid') gid: string) {
    const { user } = await this.sessionService.requireSession(req);
    await this.service.deleteStonesByGame(gid, user.id);
    return { success: true };
  }
}
