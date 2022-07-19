import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { CreateUserUseCase } from "./create.user.usecase";
import { DeleteUserByIdUseCase } from "./delete.user.by.id.usecase";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";
import { FindUserByIdUserUseCase } from "./find.user.by.id.usecase";
import { FindAllUserUseCase } from "./findall.user.usecase";
import { UpdateUserUseCase } from "./update.user.usecase";

@Module({
    imports: [UserDataBaseGatewayModule, LoggerModule],
    providers: [
        CreateUserUseCase,
        FindUserByEmailUseCase,
        FindAllUserUseCase,
        UpdateUserUseCase,
        FindUserByIdUserUseCase,
        DeleteUserByIdUseCase,
    ],
    exports: [
        CreateUserUseCase,
        FindUserByEmailUseCase,
        FindAllUserUseCase,
        UpdateUserUseCase,
        FindUserByIdUserUseCase,
        DeleteUserByIdUseCase,
    ],
})
export class UserUseCasesModule {}
