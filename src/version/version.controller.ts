import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { VersionService } from "./version.service.js";

@ApiTags("System")
@AllowAnonymous()
@Controller("version")
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get()
  @ApiOperation({ summary: "Get API version" })
  @ApiResponse({ status: 200, description: "Returns the current version of the API" })
  getVersion(): { version: string } {
    return { version: this.versionService.getVersion() };
  }
}
