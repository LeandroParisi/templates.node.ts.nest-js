import { HttpStatus, HttpException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class PipeException extends HttpException {
    @ApiProperty()
    public readonly codes: string[];

    @ApiProperty()
    public readonly message: string;

    constructor(codes: string[], message: string, status: HttpStatus) {
        super(undefined, status);
        this.name = undefined;
        this.codes = codes;
        this.message = message;
    }
}
