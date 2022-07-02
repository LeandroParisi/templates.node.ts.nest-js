import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { UserUseCasesModule } from "@use-cases/user/usecase.module";

import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";

import { UserController } from "./user.controller";

@Module({
    imports: [
        UserUseCasesModule,
        LoggerModule,
        EnvironmentConfigModule,
        UserDataBaseGatewayModule,
        UserUseCasesModule,
    ],
    controllers: [UserController],
})
export class UserControllerModule {}
