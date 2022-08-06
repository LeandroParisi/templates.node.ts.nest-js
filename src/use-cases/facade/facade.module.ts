import { Module } from "@nestjs/common";

import { LoggerModule } from "@gateways/logger/logger.module";

import { AuthenticationUseCaseModule } from "../authentication/authentication.usecase.module";
import { UserUseCasesModule } from "../user";
import { AuthenticationFacade } from "./authentication.facade";
import { UserFacade } from "./user.facade";

@Module({
    imports: [LoggerModule, UserUseCasesModule, AuthenticationUseCaseModule],
    providers: [UserFacade, AuthenticationFacade],
    exports: [UserFacade, AuthenticationFacade],
})
export class FacadeModule {}
