import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { LoggerService } from "@configs/logger/logger.service";

import { UserDatabaseGateway } from "../gateways/database/user/user.database.gateway";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(UserDatabaseGateway) private readonly userDatabaseGateway: UserDatabaseGateway,
        private readonly loggerService: LoggerService
    ) {}

    public async create(userToCreate: User): Promise<void> {
        this.loggerService.log("CREATE USER USE CASE", userToCreate);

        await this.userDatabaseGateway.create(userToCreate);
    }
}
