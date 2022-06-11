import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { FindUserByEmailDatabaseGateway } from "@gateways/database/user/interfaces/find.user.by.email.gateway";
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
        this.loggerLogGateway.log(email, "FIND USER BY EMAIL USE CASE");

        return await this.findUserByEmailDatabaseGateway.findByEmail(email);
    }
}
