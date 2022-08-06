import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { FindAllUserDatabaseGateway } from "@gateways/database/user/findall.user.database.gateway";
import { LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

@Injectable()
export class FindAllUserUseCase {
    constructor(
        @Inject(FindAllUserDatabaseGateway)
        private readonly findAllUserDatabaseGateway: FindAllUserDatabaseGateway,
        @Inject(LoggerLogGateway)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async findAll(): Promise<User[]> {
        this.loggerLogGateway.log({
            class: FindAllUserUseCase.name,
            method: "findAll",
        });

        return await this.findAllUserDatabaseGateway.findAll();
    }
}
