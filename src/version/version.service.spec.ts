import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { VersionService } from "./version.service.js";
import { packageVersion } from "../version.js";

describe("VersionService", () => {
  let service: VersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersionService],
    }).compile();

    service = module.get<VersionService>(VersionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return the package version", () => {
    expect(service.getVersion()).toBe(packageVersion);
  });
});
