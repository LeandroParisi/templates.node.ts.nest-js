import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserRequest {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    public readonly firstName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    public readonly lastName: string;

    @IsEmail()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    public readonly email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    @MinLength(8)
    public readonly password: string;
}
