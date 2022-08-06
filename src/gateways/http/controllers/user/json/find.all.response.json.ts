import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";

import { User } from "@domain/index";

import { BaseResponseJson } from "../../common/json/base.response.json";

export class FindAllResponseJson extends BaseResponseJson<User> {
    @ApiProperty()
    public readonly id?: number;

    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;

    @ApiProperty()
    public readonly email: string;

    public mapper(from: User | User[]): BaseResponseJson<User> | BaseResponseJson<User>[] {
        if (Array.isArray(from)) {
            return from.map((user) => {
                return FindAllResponseJson.builder()
                    .email(user.email)
                    .firstName(user.firstName)
                    .id(user.id)
                    .lastName(user.lastName)
                    .build();
            });
        }
        return [];
    }

    public static builder(): IBuilder<FindAllResponseJson> {
        return Builder<FindAllResponseJson>();
    }
}
