import { User } from "@domain/user";

export interface UpdateUserDatabaseGateway {
    update(userToUpdate: User): Promise<void>;
}

export const UpdateUserDatabaseGateway = Symbol("UpdateUserDatabaseGateway");
