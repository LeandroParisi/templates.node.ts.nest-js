import { Module } from "@nestjs/common";

import { UseCasesModule } from "@use-cases/usecase.module";

import { UserController } from "./user.controller";

@Module({
    imports: [UseCasesModule],
    controllers: [UserController],
})
export class ControllersModule {}
