import { Module } from "@nestjs/common";

import { UseCasesModule } from "@use-cases/usecase.module";

import { LoggerModule } from "@configs/logger/logger.module";

import { UserController } from "./user.controller";

@Module({
    imports: [UseCasesModule, LoggerModule],
    controllers: [UserController],
})
export class ControllersModule {}
