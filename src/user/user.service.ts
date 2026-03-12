import { Injectable } from '@nestjs/common';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { Auth as BetterAuthType } from 'better-auth';
import { fromNodeHeaders } from 'better-auth/node';
import type { Request } from 'express';

import { SessionService } from '../shared/auth/session.service.js';
import { DeletableDiscoveryService } from '../shared/deletable/deletable-discovery.service.js';
import type { UpdateUserProfileDto } from './dto/update-user-profile.dto.js';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService<BetterAuthType>,
    private readonly sessionService: SessionService,
    private readonly deletableDiscovery: DeletableDiscoveryService,
  ) {}

  async getProfile(req: Request) {
    const { user } = await this.sessionService.requireSession(req);
    return user;
  }

  async updateProfile(req: Request, dto: UpdateUserProfileDto) {
    const result = await this.authService.instance.api.updateUser({
      body: dto,
      headers: fromNodeHeaders(req.headers),
    });
    return result;
  }

  async deleteUserData(userId: string): Promise<void> {
    const services = this.deletableDiscovery.getDeletableServices();
    for (const service of services) {
      await service.deleteData(userId);
    }
  }
}
