import { Module } from "@nestjs/common";

import { LoggerModule } from "@gateways/logger/logger.module";

import { UseCasesModule } from "@use-cases/user/usecase.module";

import { UserController } from "./user.controller";

@Module({
    imports: [UseCasesModule, LoggerModule],
    controllers: [UserController],
})
export class ControllersModule {}
