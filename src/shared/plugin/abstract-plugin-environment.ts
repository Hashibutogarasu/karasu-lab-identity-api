import { BetterAuthPlugin } from "better-auth";
import { AbstractEnvironment } from "../config/abstract-environment.js";
import { Environment } from "../../types/environment.js";

class EnvironmentResolver extends AbstractEnvironment {}

export abstract class AbstractPluginEnvironment extends AbstractEnvironment {
  abstract getPlugin(): BetterAuthPlugin;

  static resolvePlugin<T extends AbstractPluginEnvironment, TArgs extends any[]>(
    classes: Record<Environment, new (...args: TArgs) => T>,
    ...args: TArgs
  ): BetterAuthPlugin {
    const currentEnv = new EnvironmentResolver().environment;
    const PluginClass = classes[currentEnv];
    return new PluginClass(...args).getPlugin();
  }
}
