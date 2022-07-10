import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { FacadeModule } from "@use-cases/facade/facade.module";

import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";

import { UserController } from "./user.controller";

@Module({
    imports: [FacadeModule, LoggerModule, EnvironmentConfigModule, UserDataBaseGatewayModule],
    controllers: [UserController],
})
export class UserControllerModule {}
