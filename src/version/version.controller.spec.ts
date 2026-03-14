import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { VersionController } from "./version.controller.js";
import { VersionService } from "./version.service.js";

describe("VersionController", () => {
  let controller: VersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionController],
      providers: [VersionService],
    }).compile();

    controller = module.get<VersionController>(VersionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return the version from service", () => {
    const result = controller.getVersion();
    expect(result.version).toBeDefined();
    expect(typeof result.version).toBe("string");
  });
});
