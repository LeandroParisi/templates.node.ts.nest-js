import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { ControllersModule } from "@gateways/http/controllers/user/user.controller.module";

import { UseCasesModule } from "@use-cases/user/usecase.module";

import { EnvironmentConfigModule } from "@configs/environment/environment-config.module";
import { LoggerModule } from "@configs/logger/logger.module";
import { TypeOrmConfigModule } from "@configs/typeorm/typeorm.module";

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
