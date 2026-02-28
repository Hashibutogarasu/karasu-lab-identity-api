import { AbstractEnvironment, Environment } from "@hashibutogarasu/common";
import { BetterAuthPlugin } from "better-auth";

class EnvironmentResolver extends AbstractEnvironment {}

export abstract class AbstractPluginEnvironment<T = BetterAuthPlugin> extends AbstractEnvironment {
  abstract resolve(): T;

  static resolve<T, E extends AbstractPluginEnvironment<T>, TArgs extends any[]>(
    classes: Record<Environment, new (...args: TArgs) => E>,
    ...args: TArgs
  ): T {
    const currentEnv = new EnvironmentResolver().environment;
    const EnvClass = classes[currentEnv];
    return new EnvClass(...args).resolve();
  }
}
