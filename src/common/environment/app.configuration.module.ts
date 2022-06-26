import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvironmentConfigService } from "./app-configuration.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            ignoreEnvFile: process.env.NODE_ENV === "production" ? true : false,
            isGlobal: true,
        }),
    ],
    providers: [EnvironmentConfigService],
    exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
