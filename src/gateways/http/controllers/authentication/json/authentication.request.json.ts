import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticationRequestJson {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    public readonly email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    public readonly password: string;

    public static builder(): IBuilder<AuthenticationRequestJson> {
        return Builder<AuthenticationRequestJson>();
    }
}
