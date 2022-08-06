import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import {
    CreateUserDatabaseGatewayKey,
    CreateUserDatabaseGateway,
} from "@gateways/database/user/crate.user.database.gateway";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";
import { LoggerWarnGateway, LoggerWarnGatewayKey } from "@gateways/logger/logger.warn.gateway";

import { EmailAlreadyExistsBusinessException } from "../exceptions/email.already.register.business.exception";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(CreateUserDatabaseGatewayKey)
        private readonly createUserDatabaseGateway: CreateUserDatabaseGateway,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway,
        @Inject(LoggerWarnGatewayKey)
        private readonly loggerWarnGateway: LoggerWarnGateway,
        private readonly findUserByEmailUseCase: FindUserByEmailUseCase
    ) {}

    public async create(userToCreate: User): Promise<void> {
        this.loggerLogGateway.log({
            class: CreateUserUseCase.name,
            meta: userToCreate,
            method: "create",
        });

        await this.verifyEmailAlreadyRegister(userToCreate.email);

        await this.createUserDatabaseGateway.create(userToCreate);
    }

    private async verifyEmailAlreadyRegister(email: string) {
        const userFinded = await this.findUserByEmailUseCase.find(email);

        if (userFinded) {
            this.loggerWarnGateway.warn({
                class: CreateUserUseCase.name,
                meta: email,
                method: "verifyEmailAlreadyRegister",
            });

            throw new EmailAlreadyExistsBusinessException();
        }
    }
}
