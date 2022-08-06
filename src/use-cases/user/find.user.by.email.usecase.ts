import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import {
    FindUserByEmailDatabaseGatewayKey,
    FindUserByEmailDatabaseGateway,
} from "@gateways/database/user/find.user.by.email.gateway";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

@Injectable()
export class FindUserByEmailUseCase {
    constructor(
        @Inject(FindUserByEmailDatabaseGatewayKey)
        private readonly findUserByEmailDatabaseGateway: FindUserByEmailDatabaseGateway,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async find(email: string): Promise<User | null> {
        this.loggerLogGateway.log({
            class: FindUserByEmailUseCase.name,
            meta: email,
            method: "find",
        });

        return this.findUserByEmailDatabaseGateway.findByEmail(email);
    }
}
