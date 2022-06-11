import { User } from "@domain/user";

export interface FindUserByEmailDatabaseGateway {
    findByEmail(email: string): Promise<User>;
}

export const FindUserByEmailDatabaseGateway = Symbol("FindUserByEmailDatabaseGateway");
