import { User } from "@domain/user";

export interface UserDatabaseGateway {
    insert(user: User): Promise<void>;
}
