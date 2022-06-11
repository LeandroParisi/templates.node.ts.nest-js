import { User } from "@domain/user";

export interface CreateUserDatabaseGateway {
    create(user: User): Promise<void>;
}

export const CreateUserDatabaseGateway = Symbol("CreateUserDatabaseGateway");
