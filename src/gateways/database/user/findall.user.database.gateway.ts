import { User } from "@domain/user";

export interface FindAllUserDatabaseGateway {
    findAll(): Promise<User[]>;
}

export const FindAllUserDatabaseGateway = Symbol("FindAllUserDatabaseGateway");
