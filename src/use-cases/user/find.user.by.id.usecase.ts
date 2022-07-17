import { Injectable, Inject } from "@nestjs/common";

import { FindUserByIdDatabaseGateway } from "@gateways/database/user/find.user.by.id.database.gateway";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import { User } from "@domain/user";

import { UserNotFoundBusinessException } from "../exceptions/user.not.found.business.execption";

@Injectable()
export class FindUserByIdUserUseCase {
    constructor(
        @Inject(FindUserByIdDatabaseGateway)
        private readonly findUserByIdDatabaseGateway: FindUserByIdDatabaseGateway,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async findById(id: number): Promise<User> {
        this.loggerLogGateway.log({
            class: FindUserByIdUserUseCase.name,
            meta: id,
            method: "findById",
        });

        const user = await this.findUserByIdDatabaseGateway.findById(id);

        if (user) {
            return user;
        }

        throw new UserNotFoundBusinessException();
    }
}
