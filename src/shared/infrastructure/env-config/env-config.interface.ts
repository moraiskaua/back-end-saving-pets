export interface EnvConfig {
  getAppPort(): number;
  getNodeEnv(): string;
  getJwtSecret(): string;
  getJwtExpirationTime(): number;
  getEmailUser(): string;
  getEmailPassword(): string;
}
