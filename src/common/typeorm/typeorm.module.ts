import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { EnvironmentConfigModule } from "@common/environment/environment-config.module";
import { EnvironmentConfigService } from "@common/environment/environment-config.service";

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
