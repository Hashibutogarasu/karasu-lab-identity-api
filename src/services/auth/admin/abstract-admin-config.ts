import { z } from "zod";
import { IAdminConfig } from "./admin-config.interface.js";
import { AbstractPluginEnvironment } from "../../../shared/plugin/abstract-plugin-environment.js";

/**
 * Common schema for admin configuration
 */
export const adminSchema = z.array(z.string());

/**
 * Abstract base class for admin configuration
 * Handles zod parsing common to all environments
 */
export abstract class AbstractAdminConfig extends AbstractPluginEnvironment<IAdminConfig> implements IAdminConfig {
	protected adminUserIds: string[] = [];

	abstract getUserIds(): string[];

	/**
	 * Parse input string and update admin configuration
	 * @param val JSON string to parse
	 * @returns Boolean indicating if parsing was successful
	 */
	parse(val: string): boolean {
		try {
			const parsed = JSON.parse(val);
			const result = adminSchema.safeParse(parsed);
			if (result.success) {
				this.adminUserIds = result.data;
				return true;
			}
		} catch {
			// ignore
		}
		return false;
	}

	resolve(): IAdminConfig {
		return this;
	}
}
