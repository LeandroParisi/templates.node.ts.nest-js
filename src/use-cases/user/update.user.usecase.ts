import { Injectable, Inject } from "@nestjs/common";

import {
    UpdateUserDatabaseGatewayKey,
    UpdateUserDatabaseGateway,
} from "@gateways/database/user/update.user.database.gateway";
import { LoggerLogGatewayKey, LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { User } from "@domain/user";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(UpdateUserDatabaseGatewayKey)
        private readonly updateUserDatabaseGateway: UpdateUserDatabaseGateway,
        @Inject(LoggerLogGatewayKey)
        private readonly loggerLogGateway: LoggerLogGateway
    ) {}

    public async update(userToUpdate: User): Promise<void> {
        this.loggerLogGateway.log({
            class: UpdateUserUseCase.name,
            meta: userToUpdate,
            method: "update",
        });

        await this.updateUserDatabaseGateway.update(userToUpdate);
    }
}
