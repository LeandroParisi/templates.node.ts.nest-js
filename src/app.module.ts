import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { ControllersModule } from "@gateways/http/controllers/user/user.controller.module";

import { UseCasesModule } from "@use-cases/usecase.module";

import { EnvironmentConfigModule } from "@configs/environment/environment-config.module";
import { ExceptionsModule } from "@configs/exceptions/exceptions.module";
import { LoggerModule } from "@configs/logger/logger.module";
import { TypeOrmConfigModule } from "@configs/typeorm/typeorm.module";

@Module({
    imports: [
        ControllersModule,
        EnvironmentConfigModule,
        TypeOrmConfigModule,
        LoggerModule,
        ExceptionsModule,
        UserDataBaseGatewayModule,
        UseCasesModule,
    ],
})
export class AppModule {}
