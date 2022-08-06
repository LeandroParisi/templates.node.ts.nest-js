import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from "@nestjs/common";
import { Response, Request } from "express";

import { LoggerErrorGateway, LoggerErrorGatewayKey } from "@gateways/logger/logger.error.gateway";

import { BaseException } from "@common/exceptions/base.exception";

import { DefaultException } from "../../exceptions/default.exception";
import { PipeException } from "../../exceptions/pipe.exception";
import { FilterMeta } from "./filter.meta";

@Catch()
export class ExceptionHandler implements ExceptionFilter {
    constructor(
        @Inject(LoggerErrorGatewayKey)
        private readonly loggerErrorGateway: LoggerErrorGateway
    ) {}

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let responseException: HttpException = new DefaultException();

        if (exception instanceof BaseException) {
            responseException = exception;
        } else if (exception instanceof HttpException) {
            responseException = this.createPipeException(exception);
        }

        this.logError(request, responseException);

        response.status(responseException.getStatus()).json(responseException);
    }

    private createPipeException(httpException: HttpException) {
        const status = httpException.getStatus();
        const message = httpException.message;
        const errors = (httpException.getResponse() as any).message;

        return new PipeException(errors, message, status);
    }

    private logError(request: Request, httpException: HttpException) {
        const { stack } = httpException;
        const statusCode = httpException.getStatus();
        const message = httpException.message;
        const codes = (httpException as PipeException).codes || [];

        this.loggerErrorGateway.error({
            class: ExceptionHandler.name,
            meta: FilterMeta.builder()
                .path(request.path)
                .method(request.method)
                .statusCode(statusCode)
                .message(message)
                .stack(stack)
                .codes(codes)
                .build(),
            method: "logError",
        });
    }
}
