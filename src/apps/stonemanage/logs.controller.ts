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
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { LogsService } from './logs.service.js';
import { CreateLogDto, createLogSchema } from './dto/create-log.dto.js';
import { UpdateLogDto, updateLogSchema } from './dto/update-log.dto.js';
import { LogResponseDto } from './dto/log-response.dto.js';
import { SuccessResponseDto } from '../../blogs/dto/success-response.dto.js';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@ApiTags('Stone Manage Logs')
@Controller('apps/stonemanage')
export class StoneManageLogsController {
  constructor(
    private readonly service: LogsService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'List all logs for a specific stone' })
  @ApiResponse({
    status: 200,
    description: 'Returns all logs for the specified stone.',
    type: [LogResponseDto],
  })
  @Get('stone/:sid/logs')
  async listLogs(@Req() req: Request, @Param('sid') sid: string) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.getLogs(sid, user.id);
  }

  @ApiOperation({ summary: 'Get a specific log by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the specified log.',
    type: LogResponseDto,
  })
  @Get('stone/:sid/logs/:id')
  async getLog(
    @Req() req: Request,
    @Param('sid') sid: string,
    @Param('id') id: string,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.getLog(sid, id, user.id);
  }

  @ApiOperation({ summary: 'Create a new log for a stone' })
  @ApiResponse({
    status: 201,
    description: 'The log has been successfully created.',
    type: LogResponseDto,
  })
  @Post('stone/:sid/logs')
  async createLog(
    @Req() req: Request,
    @Param('sid') sid: string,
    @Body(new ZodValidationPipe(createLogSchema)) dto: CreateLogDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.createLog(sid, user.id, dto);
  }

  @ApiOperation({ summary: 'Update an existing log' })
  @ApiResponse({
    status: 200,
    description: 'The log has been successfully updated.',
    type: LogResponseDto,
  })
  @Put('stone/:sid/logs/:id')
  async updateLog(
    @Req() req: Request,
    @Param('sid') sid: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateLogSchema)) dto: UpdateLogDto,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    return this.service.updateLog(sid, id, user.id, dto);
  }

  @ApiOperation({ summary: 'Delete a specific log' })
  @ApiResponse({
    status: 200,
    description: 'The log has been successfully deleted.',
    type: SuccessResponseDto,
  })
  @Delete('stone/:sid/logs/:id')
  async deleteLog(
    @Req() req: Request,
    @Param('sid') sid: string,
    @Param('id') id: string,
  ) {
    const { user } = await this.sessionService.requireSession(req);
    await this.service.deleteLog(sid, id, user.id);
    return { success: true };
  }
}
