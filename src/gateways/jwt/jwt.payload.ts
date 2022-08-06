import { Builder, IBuilder } from "builder-pattern";

export class JwtPayload {
    public readonly email: string;
    public readonly id?: string;

    public static builder(): IBuilder<JwtPayload> {
        return Builder<JwtPayload>();
    }
}
