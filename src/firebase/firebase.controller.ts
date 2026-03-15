import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { SessionService } from '../shared/auth/session.service.js';
import { FirebaseService } from './firebase.service.js';
import { IdTokenGuard } from '../shared/firebase/id-token/id-token.guard.js';

@ApiTags('Firebase')
@Controller('firebase')
@UseGuards(AuthGuard)
export class FirebaseController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly sessionService: SessionService,
  ) {}

  @ApiOperation({ summary: 'Verify Firebase ID Token from session' })
  @ApiResponse({
    status: 200,
    description: 'Firebase ID Token is valid.',
  })
  @Get('verify')
  @UseGuards(IdTokenGuard)
  verifyToken() {
    return { valid: true };
  }
}
