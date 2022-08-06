import { Injectable, Inject } from "@nestjs/common";

import {
    DeleteUserByIdDatabaseGatewayKey,
    DeleteUserByIdDatabaseGateway,
} from "@gateways/database/user/delete.user.by.id.database.gateway";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { FindUserByIdUserUseCase } from "./find.user.by.id.usecase";

@Injectable()
export class DeleteUserByIdUseCase {
    constructor(
        @Inject(DeleteUserByIdDatabaseGatewayKey)
        private readonly deleteUserByIdDatabaseGateway: DeleteUserByIdDatabaseGateway,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway,
        private readonly findUserByIdUserUseCase: FindUserByIdUserUseCase
    ) {}

    public async deleteById(id: number): Promise<void> {
        this.loggerLogGateway.log({
            class: DeleteUserByIdUseCase.name,
            meta: { id },
            method: "deleteById",
        });

        await this.findUserByIdUserUseCase.findById(id);
        await this.deleteUserByIdDatabaseGateway.deleteById(id);
    }
}
