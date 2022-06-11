import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { BaseException } from "@common/exceptions/base.exception";

const code = "open.finance.error.business.email.already.register";
const message = "Email Already register.";

export class EmailAlreadyExistsBusinessException extends BaseException {
    @ApiProperty({ default: code })
    public readonly code: string;

    @ApiProperty({ default: message })
    public readonly message: string;

    constructor() {
        super(HttpStatus.UNPROCESSABLE_ENTITY);
        this.code = code;
        this.message = message;
    }
}
