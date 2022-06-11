import { HttpStatus, HttpException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const defaultErrorMessage = "Open Finance Default Error.";
const defaultErrorCode = "open.finance.error.default";

export class DefaultException extends HttpException {
    @ApiProperty({ default: defaultErrorCode })
    public readonly code: string;

    @ApiProperty({ default: defaultErrorMessage })
    public readonly message: string;

    constructor() {
        super(undefined, HttpStatus.INTERNAL_SERVER_ERROR);
        this.name = undefined;
        this.code = defaultErrorCode;
        this.message = defaultErrorMessage;
    }
}
