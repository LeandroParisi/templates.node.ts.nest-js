import { Injectable } from "@nestjs/common";
import { User } from "src/domain/index";

import { UserDatabaseGatewayImpl } from "../gateways/database/user/user.database.gateway.impl";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly UserRepositoryImpl: UserDatabaseGatewayImpl) {}

    public async create(userToCreate: User): Promise<void> {
        await this.UserRepositoryImpl.insert(userToCreate);
    }
}
