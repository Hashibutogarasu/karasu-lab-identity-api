import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { DELETABLE_KEY } from './deletable.decorator.js';
import type { IDeletable } from './deletable.interface.js';

@Injectable()
export class DeletableDiscoveryService implements OnApplicationBootstrap {
  private sortedDeletables: IDeletable[] = [];

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discovery.getProviders();
    const found: { order: number; service: IDeletable }[] = [];

    for (const wrapper of providers) {
      const { metatype, instance } = wrapper;
      if (!instance || !metatype) continue;

      const order = this.reflector.get<number>(DELETABLE_KEY, metatype);
      if (order !== undefined && typeof (instance as IDeletable).deleteData === 'function') {
        found.push({ order, service: instance as IDeletable });
      }
    }

    found.sort((a, b) => a.order - b.order);
    this.sortedDeletables = found.map((f) => f.service);
  }

  getDeletableServices(): IDeletable[] {
    return this.sortedDeletables;
  }
}
