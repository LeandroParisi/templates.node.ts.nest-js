import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { CreateUserDatabaseGateway } from "@gateways/database/user/interfaces/crate.user.database.gateway";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";
import { LoggerWarnGateway } from "@gateways/logger/interfaces/logger.warn.gateway";

import { EmailAlreadyExistsBusinessException } from "../exceptions/email.already.register.business.exception";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(CreateUserDatabaseGateway)
        private readonly createUserDatabaseGateway: CreateUserDatabaseGateway,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway,
        @Inject(LoggerLogGateway)
        private readonly loggerWarnGateway: LoggerWarnGateway,
        private readonly findUserByEmailUseCase: FindUserByEmailUseCase
    ) {}

    public async create(userToCreate: User): Promise<void> {
        this.loggerLogGateway.log(userToCreate, "CREATE USER USE CASE");

        await this.verifyEmailAlreadyRegister(userToCreate.email);

        await this.createUserDatabaseGateway.create(userToCreate);
    }

    private async verifyEmailAlreadyRegister(email: string) {
        const userFinded = await this.findUserByEmailUseCase.find(email);

        if (userFinded) {
            this.loggerWarnGateway.warn(email, "EMAIL ALREADY REGISTER");
            throw new EmailAlreadyExistsBusinessException();
        }
    }
}
