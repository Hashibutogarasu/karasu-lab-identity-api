import { Controller, Get, Inject } from '@nestjs/common';
import { WellKnownService } from './well-known.service.js';

/** Serves standard well-known discovery documents required by platform clients. */
@Controller('.well-known')
export class WellKnownController {
  constructor(
    @Inject(WellKnownService)
    private readonly wellKnownService: WellKnownService,
  ) {}

  /** Digital Asset Links document required for Android passkey support. */
  @Get('assetlinks.json')
  getAssetLinks() {
    return this.wellKnownService.getAssetLinks();
  }
}
