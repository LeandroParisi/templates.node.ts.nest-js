import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";

import { LoggerModule } from "@configs/logger/logger.module";

import { CreateUserUseCase } from "./create.user.usecase";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";
import { UserFacade } from "./user.facade";

@Module({
    imports: [UserDataBaseGatewayModule, LoggerModule],
    providers: [CreateUserUseCase, FindUserByEmailUseCase, UserFacade],
    exports: [UserFacade],
})
export class UseCasesModule {}
