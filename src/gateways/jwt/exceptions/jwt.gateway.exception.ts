import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { BaseException } from "@common/exceptions/base.exception";

const code = "open.finance.error.generate.jwt";
const message = "Error to generate token.";

export class JWTGatewayException extends BaseException {
    @ApiProperty({ default: code })
    public readonly code: string;

    @ApiProperty({ default: message })
    public readonly message: string;

    constructor(stack?: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR);
        this.stack = stack;
        this.code = code;
        this.message = message;
    }
}
