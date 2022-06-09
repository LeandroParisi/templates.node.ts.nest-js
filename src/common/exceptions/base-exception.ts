import { HttpStatus } from "@nestjs/common";

export abstract class BaseException {
    abstract readonly code: string;
    abstract readonly message: string;
    abstract readonly statusCode: HttpStatus;

    public stack?: any;

    constructor(stack?: any) {
        this.stack = stack;
    }
}
