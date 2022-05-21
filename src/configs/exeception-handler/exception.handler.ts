import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpException } from "@nestjs/common";
import { Response, Request } from "express";

import { BaseException } from "../exceptions/base-exception";
import { LoggerService } from "../logger/logger.service";
import { ErrorResponseHandler } from "./error.response.handler";

@Catch()
export class ExceptionHandler implements ExceptionFilter {
    private readonly defaultErrorMessage = "Open Finance Default Error.";
    private readonly defaultErrorCode = "open.finance.error.default";

    constructor(private readonly logger: LoggerService) {}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let errorResponseHandler: ErrorResponseHandler;

        if (exception instanceof HttpException) {
            errorResponseHandler = this.handlerHttpException(exception, request);
            this.logHttpExceptionError(request, exception);
        } else if (exception instanceof BaseException) {
            errorResponseHandler = this.handlerBaseExceptionError(exception, request);
            this.logBaseExceptionError(request, exception);
        } else {
            errorResponseHandler = this.handlerOtherError(request);
            this.logOtherError(request, exception);
        }

        response.status(errorResponseHandler.statusCode).json(errorResponseHandler);
    }

    private handlerOtherError(request: Request): ErrorResponseHandler {
        return ErrorResponseHandler.builder()
            .code(this.defaultErrorCode)
            .message(this.defaultErrorCode)
            .path(request.url)
            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
            .timestamp(new Date().toISOString())
            .build();
    }

    private handlerBaseExceptionError(
        exception: BaseException,
        request: Request
    ): ErrorResponseHandler {
        return ErrorResponseHandler.builder()
            .code(exception.code || this.defaultErrorCode)
            .message(exception.message || this.defaultErrorMessage)
            .path(request.url)
            .statusCode(exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
            .timestamp(new Date().toISOString())
            .build();
    }

    private handlerHttpException(exception: HttpException, request: Request): ErrorResponseHandler {
        const { statusCode, error } = (exception as any).response;

        return ErrorResponseHandler.builder()
            .code(this.defaultErrorCode)
            .path(request.path)
            .message(exception.message || this.defaultErrorMessage)
            .errors((exception.getResponse() as any).message || error)
            .statusCode(statusCode)
            .timestamp(new Date().toISOString())
            .build();
    }

    private logBaseExceptionError(request: Request, baseException: BaseException) {
        const { statusCode, stack } = baseException;

        this.logger.error(
            `End Request for ${request.path}`,
            `method=${request.method} status=${statusCode} code=${
                baseException.code ? baseException.code : null
            } message=${baseException.message ? baseException.message : null}`,
            stack || ""
        );
    }

    private logHttpExceptionError(request: Request, httpException: HttpException) {
        const { stack } = httpException;
        const { statusCode, message, error } = (httpException as any).response;

        this.logger.error(
            `End Request for ${request.path}`,
            `method=${request.method} status=${
                statusCode || HttpStatus.INTERNAL_SERVER_ERROR
            } errors=${message || this.defaultErrorMessage} message=${error ? error : null}`,
            stack || ""
        );
    }

    private logOtherError(request: Request, error: Error) {
        const { stack, message } = error;

        this.logger.error(
            `End Request for ${request.path}`,
            `method=${request.method} message=${message ? message : null}`,
            stack || ""
        );
    }
}
