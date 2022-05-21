import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { BaseException } from "@configs/exceptions/base-exception";

const code = "open.finance.error.database.create.user";
const message = "Error to create user.";

export class CreateUserGatewayException extends BaseException {
    @ApiProperty({ default: code })
    public readonly code: string;

    @ApiProperty({ default: message })
    public readonly message: string;

    @ApiProperty({ default: HttpStatus.INTERNAL_SERVER_ERROR })
    public statusCode: HttpStatus;

    constructor(stack: any) {
        super(stack);
        this.code = code;
        this.message = message;
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
