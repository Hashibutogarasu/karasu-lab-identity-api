import { memoryAdapter } from "better-auth/adapters/memory";
import { AbstractDatabaseService } from "../../src/shared/database/abstract-database.service.js";

const createEmptyStore = (): Record<string, any[]> => ({
  user: [],
  session: [],
  account: [],
  verification: [],
  organization: [],
  member: [],
  invitation: [],
  team: [],
  teamMember: [],
  twoFactor: [],
  passkey: [],
  oauthApplication: [],
  oauthAccessToken: [],
  oauthConsent: [],
  jwks: [],
});

export class MemoryDatabaseService extends AbstractDatabaseService {
  private store: Record<string, any[]>;

  constructor(environment: string = "test") {
    super(environment);
    this.store = createEmptyStore();
  }

  getHandler() {
    return memoryAdapter(this.store);
  }

  close(): Promise<void> {
    return Promise.resolve();
  }
}
