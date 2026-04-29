import { Module } from '@nestjs/common';
import {
  GamesResolver,
  StonesResolver,
  StoneLogsResolver,
} from './resolvers/stonemanage.resolver.js';
import { FirebaseAdminServiceProvider } from '../../shared/firebase/firebase-admin.provider.js';
import { ConfigServiceProvider } from '../../shared/config/config.service.js';

@Module({
  providers: [
    GamesResolver,
    StonesResolver,
    StoneLogsResolver,
    FirebaseAdminServiceProvider,
    ConfigServiceProvider,
  ],
})
export class StoneManageModule {}
