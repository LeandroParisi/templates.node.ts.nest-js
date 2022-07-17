import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";

import { User } from "@domain/index";

import { BaseResponseJson } from "../../json/base.response.json";

export class FindByIdResponseJson extends BaseResponseJson<User> {
    @ApiProperty()
    public readonly id?: number;

    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;

    @ApiProperty()
    public readonly email: string;

    public mapper(user: User | User[]): BaseResponseJson<User> | BaseResponseJson<User>[] {
        if (!Array.isArray(user) && user) {
            return FindByIdResponseJson.builder()
                .email(user.email)
                .firstName(user.firstName)
                .id(user.id)
                .lastName(user.lastName)
                .build();
        }
    }

    public static builder(): IBuilder<FindByIdResponseJson> {
        return Builder<FindByIdResponseJson>();
    }
}
