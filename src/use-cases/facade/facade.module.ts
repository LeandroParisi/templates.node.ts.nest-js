import { Module } from "@nestjs/common";

import { LoggerModule } from "@gateways/logger/logger.module";

import { UserUseCasesModule } from "../user";
import { UserFacade } from "./user.facade";

@Module({
    imports: [LoggerModule, UserUseCasesModule],
    providers: [UserFacade],
    exports: [UserFacade],
})
export class FacadeModule {}
