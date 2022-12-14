export interface AppConfiguration {
    getDatabaseHost(): string;
    getDatabasePort(): number;
    getDatabaseUser(): string;
    getDatabasePassword(): string;
    getDatabaseName(): string;
    getDatabaseSchema(): string;
    getDatabaseSync(): boolean;
    getPasswordEncryptionKey(): string;
    getPasswordEncryptionKeyAlgorithm(): string;
    getPasswordEncryptionLength(): number;
    getPasswordIv(): string;
    getRedisHost(): string;
    getRedisPort(): number;
    getRedisPassword(): string;
    getJwtSecret(): string;
    getJwtExpirationTime(): number;
    getJwtRefreshTokenExpirationTime(): number;
    getEncryptionPassword(): string;
    getEncryptionIV(): string;
}
