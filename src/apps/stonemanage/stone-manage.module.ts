import { Module } from '@nestjs/common';
import { GamesService } from './games.service.js';
import { StonesService } from './stones.service.js';
import { LogsService } from './logs.service.js';
import { GamesRepository } from './repositories/games.repository.js';
import { StonesRepository } from './repositories/stones.repository.js';
import { LogsRepository } from './repositories/logs.repository.js';
import { SessionModule } from '../../shared/auth/session.module.js';
import { FirebaseAdminServiceProvider } from '../../shared/firebase/firebase-admin.provider.js';
import { ConfigServiceProvider } from '../../shared/config/config.service.js';
import { RolesGuard } from '../../shared/auth/roles.guard.js';
import { StoneManageGamesController } from './games.controller.js';
import { StoneManageStonesController } from './stones.controller.js';
import { StoneManageLogsController } from './logs.controller.js';
import { StoneManageImagesController } from './images.controller.js';

@Module({
  imports: [SessionModule],
  controllers: [
    StoneManageGamesController,
    StoneManageStonesController,
    StoneManageLogsController,
    StoneManageImagesController,
  ],
  providers: [
    GamesService,
    StonesService,
    LogsService,
    GamesRepository,
    StonesRepository,
    LogsRepository,
    FirebaseAdminServiceProvider,
    ConfigServiceProvider,
    RolesGuard,
  ],
  exports: [GamesService, StonesService, LogsService],
})
export class StoneManageModule {}
