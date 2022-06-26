import { ApiProperty } from "@nestjs/swagger";
import { Builder, IBuilder } from "builder-pattern";

export class FindAllResponse {
    @ApiProperty()
    public readonly id?: number;

    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;

    @ApiProperty()
    public readonly email: string;

    public static builder(): IBuilder<FindAllResponse> {
        return Builder<FindAllResponse>();
    }
}
