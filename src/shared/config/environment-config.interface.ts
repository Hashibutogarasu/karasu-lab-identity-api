import { Environment } from "../../types/environment.js";

export interface IEnvironmentConfig {
  readonly environment: Environment;
  
  /**
   * 環境が本番環境かどうか
   */
  isProduction(): boolean;
  
  /**
   * 環境が開発環境かどうか
   */
  isDevelopment(): boolean;
  
  /**
   * 環境がテスト環境かどうか
   */
  isTest(): boolean;
}
