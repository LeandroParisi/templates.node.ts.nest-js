import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { EnvironmentConfigService } from "@common/environment/app-configuration.service";
import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
    ({
        type: "postgres",
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: [__dirname + "./../../**/*.entity{.ts,.js}"],
        synchronize: true,
        schema: process.env.DATABASE_SCHEMA,
        ssl: false,
    } as TypeOrmModuleOptions);

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})
export class TypeOrmConfigModule {}
