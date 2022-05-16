import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppProperties } from "./app.properties";
import { AppConfig } from "./app.properties.interface";

@Injectable()
export class EnvironmentConfigService implements AppConfig {
    constructor(private configService: ConfigService<AppProperties>) {}

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
}
