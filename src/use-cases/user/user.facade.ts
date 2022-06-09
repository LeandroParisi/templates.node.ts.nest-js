import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { CreateUserUseCase } from "./create.user.usecase";

@Injectable()
export class UserFacade {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async create(userToCreate: User): Promise<void> {
        this.loggerLogGateway.log(userToCreate, "CREATE USER FACADE");

        await this.createUserUseCase.create(userToCreate);
    }
}
