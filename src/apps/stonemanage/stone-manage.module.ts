import { Module } from '@nestjs/common';
import { StoneManageService } from './stone-manage.service.js';
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

@Module({
  imports: [SessionModule],
  controllers: [
    StoneManageGamesController,
    StoneManageStonesController,
    StoneManageLogsController,
  ],
  providers: [
    StoneManageService,
    GamesRepository,
    StonesRepository,
    LogsRepository,
    FirebaseAdminServiceProvider,
    ConfigServiceProvider,
    RolesGuard,
  ],
})
export class StoneManageModule {}
