import { Injectable, Inject } from "@nestjs/common";

import { DeleteUserByIdDatabaseGateway } from "@gateways/database/user/delete.user.by.id.database.gateway";
import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

import { FindUserByIdUserUseCase } from "./find.user.by.id.usecase";

@Injectable()
export class DeleteUserByIdUseCase {
    constructor(
        @Inject(DeleteUserByIdDatabaseGateway)
        private readonly deleteUserByIdDatabaseGateway: DeleteUserByIdDatabaseGateway,
        @Inject(LoggerLogGateway)
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
