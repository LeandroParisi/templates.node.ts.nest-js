import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppConfiguration } from "./app.configuration";
import { AppProperties } from "./app.properties";

@Injectable()
export class EnvironmentConfigService implements AppConfiguration {
    constructor(private configService: ConfigService<AppProperties>) {}

    public getRedisHost(): string {
        return this.configService.get<string>("REDIS_HOST");
    }

    public getRedisPort(): number {
        return this.configService.get<number>("REDIS_PORT");
    }

    public getRedisPassword(): string {
        return this.configService.get<string>("REDIS_PASSWORD");
    }

    public getDatabaseHost(): string {
        return this.configService.get<string>("DATABASE_HOST");
    }

    public getDatabasePort(): number {
        return this.configService.get<number>("DATABASE_PORT");
    }

    public getDatabaseUser(): string {
        return this.configService.get<string>("DATABASE_USER");
    }

    public getDatabasePassword(): string {
        return this.configService.get<string>("DATABASE_PASSWORD");
    }

    public getDatabaseName(): string {
        return this.configService.get<string>("DATABASE_NAME");
    }

    public getDatabaseSchema(): string {
        return this.configService.get<string>("DATABASE_SCHEMA");
    }

    public getDatabaseSync(): boolean {
        return this.configService.get<boolean>("DATABASE_SYNCHRONIZE");
    }

    public getPasswordEncryptionKey(): string {
        return this.configService.get<string>("PASSWORD_ENCRYPTION_KEY");
    }

    public getPasswordEncryptionKeyAlgorithm(): string {
        return this.configService.get<string>("PASSWORD_ENCRYPTION_ALGORITHM");
    }

    public getPasswordEncryptionLength(): number {
        return this.configService.get<number>("PASSWORD_ENCRYPTION_LENGTH");
    }

    public getPasswordIv(): string {
        return this.configService.get<string>("PASSWORD_ENCRYPTION_IV");
    }
}
