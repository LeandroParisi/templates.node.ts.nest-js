import { HttpStatus, HttpException } from "@nestjs/common";

export abstract class BaseException extends HttpException {
    abstract readonly code: string;
    abstract readonly message: string;

    constructor(status: HttpStatus) {
        super(undefined, status);
        this.name = undefined;
    }
}
