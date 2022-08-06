import { Module } from "@nestjs/common";

import { LoggerModule } from "@gateways/logger/logger.module";

import { FacadeModule } from "@use-cases/facade/facade.module";

import { UserController } from "./user.controller";

@Module({
    imports: [FacadeModule, LoggerModule],
    controllers: [UserController],
})
export class UserControllerModule {}
