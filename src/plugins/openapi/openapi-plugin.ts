import { BetterAuthPlugin } from "better-auth";
import { openAPI as defaultOpenAPI } from "better-auth/plugins";
import { AbstractPluginEnvironment } from "../../shared/plugin/abstract-plugin-environment.js";
import { Environment } from "../../types/environment.js";

class ProductionOpenAPIEnvironment extends AbstractPluginEnvironment {
  getPlugin(): BetterAuthPlugin {
    return {
      id: "openapi",
      endpoints: {}
    } satisfies BetterAuthPlugin;
  }
}

class DevelopmentOpenAPIEnvironment extends AbstractPluginEnvironment {
  getPlugin(): BetterAuthPlugin {
    return defaultOpenAPI();
  }
}

class TestOpenAPIEnvironment extends AbstractPluginEnvironment {
  getPlugin(): BetterAuthPlugin {
    return defaultOpenAPI();
  }
}

export const openAPIPlugin = (): BetterAuthPlugin => {
  return AbstractPluginEnvironment.resolvePlugin({
    [Environment.PRODUCTION]: ProductionOpenAPIEnvironment,
    [Environment.DEVELOPMENT]: DevelopmentOpenAPIEnvironment,
    [Environment.TEST]: TestOpenAPIEnvironment,
  });
};
