import { User } from "@domain/user";

export interface FindUserByIdDatabaseGateway {
    findById(id: number): Promise<User | null>;
}

export const FindUserByIdDatabaseGatewayKey = Symbol("FindUserByIdDatabaseGateway");
