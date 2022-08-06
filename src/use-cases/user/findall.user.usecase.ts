import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import {
    FindAllUserDatabaseGatewayKey,
    FindAllUserDatabaseGateway,
} from "@gateways/database/user/findall.user.database.gateway";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

@Injectable()
export class FindAllUserUseCase {
    constructor(
        @Inject(FindAllUserDatabaseGatewayKey)
        private readonly findAllUserDatabaseGateway: FindAllUserDatabaseGateway,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async findAll(): Promise<User[]> {
        this.loggerLogGateway.log({
            class: FindAllUserUseCase.name,
            method: "findAll",
        });

        return this.findAllUserDatabaseGateway.findAll();
    }
}
