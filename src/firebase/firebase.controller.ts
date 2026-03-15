import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';
import { SessionService } from '../shared/auth/session.service.js';
import { FirebaseService } from './firebase.service.js';

@ApiTags('Firebase')
@Controller('firebase')
@UseGuards(AuthGuard)
export class FirebaseController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'Get a Firebase Custom Token for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Firebase Custom Token.',
    schema: {
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @Get('token')
  async getToken(@Req() req: Request) {
    const { user } = await this.sessionService.requireSession(req);
    const token = await this.firebaseService.createCustomToken(user.id);
    return { token };
  }
}
