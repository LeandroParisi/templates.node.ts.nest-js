import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { BaseException } from "@common/exceptions/base.exception";

const code = "open.finance.error.business.usernotfound";
const message = "User not found.";

export class UserNotFoundBusinessException extends BaseException {
    @ApiProperty({ default: code })
    public readonly code: string;

    @ApiProperty({ default: message })
    public readonly message: string;

    constructor() {
        super(HttpStatus.NOT_FOUND);
        this.code = code;
        this.message = message;
    }
}
