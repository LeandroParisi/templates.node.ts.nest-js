import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { FindUserByEmailDatabaseGateway } from "@gateways/database/user/find.user.by.email.gateway";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

@Injectable()
export class FindUserByEmailUseCase {
    constructor(
        @Inject(FindUserByEmailDatabaseGateway)
        private readonly findUserByEmailDatabaseGateway: FindUserByEmailDatabaseGateway,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async find(email: string): Promise<User | null> {
        this.loggerLogGateway.log({
            class: FindUserByEmailUseCase.name,
            meta: email,
            method: "find",
        });

        return await this.findUserByEmailDatabaseGateway.findByEmail(email);
    }
}
