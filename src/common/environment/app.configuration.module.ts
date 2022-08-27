import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvironmentConfigService } from "./app.configuration.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `./env/.env.${process.env.NODE_ENV}`,
            ignoreEnvFile: process.env.NODE_ENV === "production",
            isGlobal: true,
        }),
    ],
    providers: [EnvironmentConfigService],
    exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
