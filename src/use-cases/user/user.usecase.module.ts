import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { CreateUserUseCase } from "./create.user.usecase";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";
import { FindAllUserUseCase } from "./findall.user.usecase";
import { UpdateUserUseCase } from "./update.user.usecase";
import { UserFacade } from "./user.facade";

@Module({
    imports: [UserDataBaseGatewayModule, LoggerModule],
    providers: [
        CreateUserUseCase,
        FindUserByEmailUseCase,
        UserFacade,
        FindAllUserUseCase,
        UpdateUserUseCase,
    ],
    exports: [UserFacade],
})
export class UserUseCasesModule {}
