import { User } from "@domain/user";

export interface UserDatabaseGateway {
    create(user: User): Promise<void>;
}

export const UserDatabaseGateway = Symbol("UserDatabaseGateway");
