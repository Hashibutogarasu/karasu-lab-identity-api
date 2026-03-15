import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { VersionService } from "./version.service.js";

@ApiTags("System")
@Controller("version")
export class VersionController {
  constructor(@Inject(VersionService) private readonly versionService: VersionService) {}

  @Get()
  @ApiOperation({ summary: "Get API version" })
  @ApiResponse({ status: 200, description: "Returns the current version of the API" })
  getVersion(): { version: string } {
    return { version: this.versionService.getVersion() };
  }
}
