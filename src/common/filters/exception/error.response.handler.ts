import { ApiProperty } from "@nestjs/swagger";

import { Builder, IBuilder } from "@utils/builder";

export class ErrorResponseHandler {
    @ApiProperty()
    public readonly message: string;

    @ApiProperty()
    public readonly statusCode: number;

    @ApiProperty()
    public readonly path: string;

    @ApiProperty()
    public readonly timestamp: string;

    @ApiProperty()
    public readonly errors?: string[] | string;

    @ApiProperty()
    public readonly code?: string;

    public static builder(): IBuilder<ErrorResponseHandler> {
        return Builder<ErrorResponseHandler>();
    }
}
