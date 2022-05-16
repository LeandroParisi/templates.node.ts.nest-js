import { Builder, IBuilder } from "@utils/builder";

export class User {
    public readonly id: number;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly email: string;
    public readonly password: string;

    public static builder(): IBuilder<User> {
        return Builder<User>();
    }
}
