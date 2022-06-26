import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { CreateUserUseCase } from "./user/create.user.usecase";
import { FindUserByEmailUseCase } from "./user/find.user.by.email.usecase";
import { FindAllUserUseCase } from "./user/findall.user.usecase";
import { UserFacade } from "./user/user.facade";

@Module({
    imports: [UserDataBaseGatewayModule, LoggerModule],
    providers: [CreateUserUseCase, FindUserByEmailUseCase, UserFacade, FindAllUserUseCase],
    exports: [UserFacade],
})
export class UseCasesModule {}
