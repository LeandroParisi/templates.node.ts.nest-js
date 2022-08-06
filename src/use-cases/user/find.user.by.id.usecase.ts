import { Injectable, Inject } from "@nestjs/common";

import {
    FindUserByIdDatabaseGatewayKey,
    FindUserByIdDatabaseGateway,
} from "@gateways/database/user/find.user.by.id.database.gateway";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { User } from "@domain/user";

import { UserNotFoundBusinessException } from "../exceptions/user.not.found.business.exception";

@Injectable()
export class FindUserByIdUserUseCase {
    constructor(
        @Inject(FindUserByIdDatabaseGatewayKey)
        private readonly findUserByIdDatabaseGateway: FindUserByIdDatabaseGateway,
        @Inject(LoggerLogGatewayKey)
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
