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
import { GamesService } from './games.service.js';
import { CreateGameDto, createGameSchema } from './dto/create-game.dto.js';
import { UpdateGameDto, updateGameSchema } from './dto/update-game.dto.js';
import { GameResponseDto } from './dto/game-response.dto.js';
import { SuccessResponseDto } from '../../blogs/dto/success-response.dto.js';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { Pagination } from '../../shared/decorators/pagination.decorator.js';
import { BasePaginationQueryDto } from '../../shared/dto/pagination-query.dto.js';

@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@ApiTags('Stone Manage Games')
@Controller('apps/stonemanage')
export class StoneManageGamesController {
  constructor(
    private readonly service: GamesService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'List all games' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of games for the authenticated user.',
    type: [GameResponseDto],
  })
  @Get('games')
  async listGames(
    @Req() req: Request,
    @Pagination() query: BasePaginationQueryDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.getGames(user.id, query);
  }

  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({
    status: 201,
    description: 'The game has been successfully created.',
    type: GameResponseDto,
  })
  @Post('games')
  async createGame(
    @Req() req: Request,
    @Body(new ZodValidationPipe(createGameSchema)) dto: CreateGameDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.createGame(user.id, dto);
  }

  @ApiOperation({ summary: 'Get a game by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the game data.',
    type: GameResponseDto,
  })
  @Get('games/:id')
  async getGame(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.getGame(id, user.id);
  }

  @ApiOperation({ summary: 'Update a game' })
  @ApiResponse({
    status: 200,
    description: 'The game metadata has been successfully updated.',
    type: GameResponseDto,
  })
  @Put('games/:id')
  async updateGame(
    @Req() req: Request,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateGameSchema)) dto: UpdateGameDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.updateGame(id, user.id, dto);
  }

  @ApiOperation({ summary: 'Delete a game and its stones' })
  @ApiResponse({
    status: 200,
    description: 'The game has been successfully deleted.',
    type: SuccessResponseDto,
  })
  @Delete('games/:id')
  async deleteGame(@Req() req: Request, @Param('id') id: string) {
    const { user } = await this.sessionService.requireSession(req);
    await this.service.deleteGame(id, user.id);
    return { success: true };
  }
}
