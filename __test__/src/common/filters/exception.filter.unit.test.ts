import { ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { mock, anyString } from "jest-mock-extended";

import { DefaultException } from "../../../../src/common/exceptions/default.exception";
import { ExceptionHandler } from "../../../../src/common/filters/exception/exception.filter";
import { UserDatabaseGatewayException } from "../../../../src/gateways/database/exceptions/user.database.gateway.exception";
import { LoggerErrorGateway } from "../../../../src/gateways/logger/logger.error.gateway";

describe("Tests of ExceptionHandler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const path = "anyPath";
    const method = "anyMethod";
    const stack = "anyStack";

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json: json });

    const getResponse = jest.fn().mockReturnValue({ status });
    const getRequest = jest.fn().mockReturnValue({ path, method });

    const mockedLoggerErrorGateway = mock<LoggerErrorGateway>();

    const exceptionHandler = new ExceptionHandler(mockedLoggerErrorGateway);

    const mockedArgumentsHost = mock<ArgumentsHost>();
    mockedArgumentsHost.switchToHttp
        .calledWith()
        .mockReturnValue({ getResponse, getRequest } as any);

    it("Should log error BaseException", () => {
        const exception = new UserDatabaseGatewayException(stack);

        exceptionHandler.catch(exception, mockedArgumentsHost);

        expect(mockedLoggerErrorGateway.error).toBeCalledWith({
            class: "ExceptionHandler",
            meta: {
                path: path,
                method: method,
                statusCode: 500,
                message: exception.message,
                stack: stack,
                codes: undefined,
            },
            method: "logError",
        });

        expect(status).toBeCalledWith(500);
        expect(json).toBeCalledWith(exception);
    });

    it("Should log error HttpException", () => {
        const exception = new HttpException("error", HttpStatus.INTERNAL_SERVER_ERROR);

        exceptionHandler.catch(exception, mockedArgumentsHost);

        expect(mockedLoggerErrorGateway.error).toBeCalledWith({
            class: "ExceptionHandler",
            meta: {
                path: path,
                method: method,
                statusCode: 500,
                message: exception.message,
                stack: anyString(),
                codes: undefined,
            },
            method: "logError",
        });

        expect(status).toBeCalledWith(500);
        expect(json).toBeCalledWith(exception);
    });

    it("Should log error HttpException with codes", () => {
        const response = {
            statusCode: 400,
            message: ["firstName should not be empty"],
            error: "Bad Request",
        };

        const message = "anyMessage";
        const exception = new HttpException(response, HttpStatus.UNPROCESSABLE_ENTITY);
        exception.message = message;

        exceptionHandler.catch(exception, mockedArgumentsHost);

        expect(mockedLoggerErrorGateway.error).toBeCalledWith({
            class: "ExceptionHandler",
            meta: {
                path: path,
                method: method,
                statusCode: 422,
                message: exception.message,
                stack: anyString(),
                codes: response.message,
            },
            method: "logError",
        });

        expect(status).toBeCalledWith(422);
        expect(json).toBeCalledWith(exception);
    });

    it("Should log error Other Exceptions", () => {
        const exception = new Error();
        exception.stack = undefined;

        exceptionHandler.catch(exception, mockedArgumentsHost);

        expect(mockedLoggerErrorGateway.error).toBeCalledWith({
            class: "ExceptionHandler",
            meta: {
                path: path,
                method: method,
                statusCode: 500,
                message: "Open Finance Default Error.",
                stack: anyString(),
                codes: undefined,
            },
            method: "logError",
        });

        expect(status).toBeCalledWith(500);
        expect(json).toBeCalledWith(new DefaultException());
    });
});
