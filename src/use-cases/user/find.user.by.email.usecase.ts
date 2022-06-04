import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerService } from "@configs/logger/logger.service";

import { FindUserByEmailDatabaseGateway } from "../../gateways/database/user/find.user.by.email.gateway";

@Injectable()
export class FindUserByEmailUseCase {
    constructor(
        @Inject(FindUserByEmailDatabaseGateway)
        private readonly findUserByEmailDatabaseGateway: FindUserByEmailDatabaseGateway,
        private readonly loggerService: LoggerService
    ) {}

    public async find(email: string): Promise<User | null> {
        this.loggerService.log("FIND USER BY EMAIL USE CASE", email);

        return await this.findUserByEmailDatabaseGateway.findByEmail(email);
    }
}
