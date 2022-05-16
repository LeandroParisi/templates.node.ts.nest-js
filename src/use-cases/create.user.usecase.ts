import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/index";

import { UserDatabaseGateway } from "../gateways/database/user/user.database.gateway";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(UserDatabaseGateway) private readonly userDatabaseGateway: UserDatabaseGateway
    ) {}

    public async create(userToCreate: User): Promise<void> {
        await this.userDatabaseGateway.insert(userToCreate);
    }
}
