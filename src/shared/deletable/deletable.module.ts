import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DeletableDiscoveryService } from './deletable-discovery.service.js';

@Module({
  imports: [DiscoveryModule],
  providers: [DeletableDiscoveryService],
  exports: [DeletableDiscoveryService],
})
export class DeletableModule {}
