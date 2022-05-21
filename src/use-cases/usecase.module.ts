import { Module } from "@nestjs/common";

import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";

import { LoggerModule } from "@configs/logger/logger.module";

import { CreateUserUseCase } from "./create.user.usecase";

@Module({
    imports: [UserDataBaseGatewayModule, LoggerModule],
    providers: [CreateUserUseCase],
    exports: [CreateUserUseCase],
})
export class UseCasesModule {}
