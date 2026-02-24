import { describe, it, expect } from "vitest";
import { EnvironmentUtils } from "./enviroment.js";
import { Environment } from "../types/environment.js";

describe("EnvironmentUtils", () => {
	describe("isProduction", () => {
		it("should return true when environment is production", () => {
			expect(EnvironmentUtils.isProduction(Environment.PRODUCTION)).toBe(true);
			expect(EnvironmentUtils.isProduction("production")).toBe(true);
		});

		it("should return false when environment is not production", () => {
			expect(EnvironmentUtils.isProduction(Environment.DEVELOPMENT)).toBe(false);
			expect(EnvironmentUtils.isProduction("development")).toBe(false);
		});
	});

	describe("isDevelopment", () => {
		it("should return true when environment is development", () => {
			expect(EnvironmentUtils.isDevelopment(Environment.DEVELOPMENT)).toBe(true);
			expect(EnvironmentUtils.isDevelopment("development")).toBe(true);
		});

		it("should return false when environment is not development", () => {
			expect(EnvironmentUtils.isDevelopment(Environment.PRODUCTION)).toBe(false);
			expect(EnvironmentUtils.isDevelopment("production")).toBe(false);
		});
	});

	describe("isTest", () => {
		it("should return true when environment is test", () => {
			expect(EnvironmentUtils.isTest(Environment.TEST)).toBe(true);
			expect(EnvironmentUtils.isTest("test")).toBe(true);
		});

		it("should return false when environment is not test", () => {
			expect(EnvironmentUtils.isTest(Environment.DEVELOPMENT)).toBe(false);
			expect(EnvironmentUtils.isTest("development")).toBe(false);
		});
	});
});
