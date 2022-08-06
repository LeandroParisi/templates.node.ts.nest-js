import { Injectable, Inject } from "@nestjs/common";

import { UpdateUserDatabaseGateway } from "@gateways/database/user/update.user.database.gateway";
import { LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

import { User } from "@domain/user";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(UpdateUserDatabaseGateway)
        private readonly updateUserDatabaseGateway: UpdateUserDatabaseGateway,
        @Inject(LoggerLogGateway)
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
