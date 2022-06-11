import { Module } from "@nestjs/common";

import { TypeOrmConfigModule } from "@gateways/database/user/postgress/typeorm.module";
import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { ControllersModule } from "@gateways/http/controllers/user/user.controller.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { UseCasesModule } from "@use-cases/user/usecase.module";

import { EnvironmentConfigModule } from "@common/environment/environment-config.module";

@Module({
    imports: [
        ControllersModule,
        EnvironmentConfigModule,
        TypeOrmConfigModule,
        LoggerModule,
        UserDataBaseGatewayModule,
        UseCasesModule,
    ],
})
export class AppModule {}
