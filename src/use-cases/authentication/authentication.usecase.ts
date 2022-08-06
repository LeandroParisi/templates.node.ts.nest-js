import { Injectable, Inject } from "@nestjs/common";

import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import { User } from "@domain/user";

import { FindUserByEmailUseCase } from "../user/find.user.by.email.usecase";
import { CreateTokensUseCase } from "./create.tokens.usecase";
import { IncorrectCredentialsBusinessException } from "./exceptions/incorrect.credentials.business.exception";

@Injectable()
export class AuthenticationUseCase {
    constructor(
        private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
        private readonly createTokensUseCase: CreateTokensUseCase,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async authenticate(password: string, email: string): Promise<User> {
        this.loggerLogGateway.log({
            class: AuthenticationUseCase.name,
            method: "authenticate",
            meta: { email },
        });

        const userFinded = await this.findUser(email, password);

        const { accessToken, refreshToken } = await this.createTokensUseCase.create(
            userFinded.id,
            userFinded.email
        );

        return this.createAuthenticatedUser(accessToken, refreshToken, userFinded);
    }

    private async findUser(email: string, password: string) {
        const userFinded = await this.findUserByEmailUseCase.find(email);

        if (!userFinded || userFinded.password !== password) {
            throw new IncorrectCredentialsBusinessException();
        }

        return userFinded;
    }

    private createAuthenticatedUser(
        accessToken: string,
        refreshToken: string,
        userFinded: User
    ): User | PromiseLike<User> {
        return User.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .email(userFinded.email)
            .firstName(userFinded.firstName)
            .lastName(userFinded.lastName)
            .id(userFinded.id)
            .build();
    }
}
