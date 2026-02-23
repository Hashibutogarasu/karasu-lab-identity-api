import { BetterAuthPlugin, Endpoint } from "better-auth";
import { AuthEndpoint } from "better-auth/api";
import { AbstractEndpoint } from "./abstract-endpoint.js";

export abstract class AbstractBAuthPlugin {
  constructor(public readonly id: string) {}

  abstract readonly endpoints: Record<string, AbstractEndpoint<string, Endpoint['options'], unknown>>;

  getPlugin(): BetterAuthPlugin {
    const endpoints: Record<string, AuthEndpoint<string, Endpoint['options'], unknown>> = {};
    
    for (const [key, endpoint] of Object.entries(this.endpoints)) {
      endpoints[key] = endpoint.getEndpoint();
    }

    return {
      id: this.id,
      endpoints,
    } as BetterAuthPlugin;
  }
}
