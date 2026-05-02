import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { RolesGuard } from '../shared/auth/roles.guard.js';
import { SessionService } from '../shared/auth/session.service.js';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe.js';
import { UserService } from './user.service.js';
import {
  UpdateUserProfileDto,
  updateUserProfileSchema,
} from './dto/update-user-profile.dto.js';
import { UserProfileResponseDto } from './dto/user-profile-response.dto.js';

@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the authenticated user profile.',
    type: UserProfileResponseDto,
  })
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return this.userService.getProfile(req);
  }

  @ApiOperation({ summary: 'Get unified profile info from social provider' })
  @Get('me')
  async getMe(@Req() req: Request, @Query('p') providerId?: string) {
    if (providerId) {
      return this.userService.getSocialProfile(req, providerId);
    }
    return this.userService.getProfile(req);
  }

  @ApiOperation({ summary: 'Update the authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user profile.',
    type: UserProfileResponseDto,
  })
  @Put('profile')
  async updateProfile(
    @Req() req: Request,
    @Body(new ZodValidationPipe(updateUserProfileSchema))
    dto: UpdateUserProfileDto,
  ) {
    return this.userService.updateProfile(req, dto);
  }

  @ApiOperation({
    summary: 'Delete all custom data for the authenticated user',
  })
  @ApiResponse({ status: 204, description: 'User data deleted successfully.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteUser(@Req() req: Request) {
    const { user } = await this.sessionService.requireSession(req);
    await this.userService.deleteUserData(user.id);
  }
}
