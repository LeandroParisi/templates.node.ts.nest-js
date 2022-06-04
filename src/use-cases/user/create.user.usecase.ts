import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerService } from "@configs/logger/logger.service";

import { CreateUserDatabaseGateway } from "../../gateways/database/user/crate.user.database.gateway";
import { EmailAlreadyExistsBusinessException } from "../exceptions/email.already.register.business.exception";
import { FindUserByEmailUseCase } from "./find.user.by.email.usecase";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(CreateUserDatabaseGateway)
        private readonly createUserDatabaseGateway: CreateUserDatabaseGateway,
        private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
        private readonly loggerService: LoggerService
    ) {}

    public async create(userToCreate: User): Promise<void> {
        this.loggerService.log("CREATE USER USE CASE", userToCreate);

        await this.verifyEmailAlreadyRegister(userToCreate.email);

        await this.createUserDatabaseGateway.create(userToCreate);
    }

    private async verifyEmailAlreadyRegister(email: string) {
        const userFinded = await this.findUserByEmailUseCase.find(email);

        if (userFinded) {
            this.loggerService.warn("EMAIL ALREADY REGISTER", email);
            throw new EmailAlreadyExistsBusinessException();
        }
    }
}
