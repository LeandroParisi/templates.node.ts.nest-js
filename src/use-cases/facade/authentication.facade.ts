import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { AuthenticationUseCase } from "../authentication/authentication.usecase";

@Injectable()
export class AuthenticationFacade {
    constructor(
        private readonly authenticationUseCase: AuthenticationUseCase,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async authenticate(password: string, email: string): Promise<User> {
        this.loggerLogGateway.log({
            class: AuthenticationFacade.name,
            meta: email,
            method: "authenticate",
        });

        return this.authenticationUseCase.authenticate(password, email);
    }
}
