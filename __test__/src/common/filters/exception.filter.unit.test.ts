import { ArgumentsHost, HttpException, Logger, HttpStatus } from "@nestjs/common";
import { mock, anyString } from "jest-mock-extended";

import { DefaultException } from "../../../../src/common/exceptions/default.exception";
import { ExceptionHandler } from "../../../../src/common/filters/exception.filter";
import { UserDatabaseGatewayException } from "../../../../src/gateways/exceptions/user.database.gateway.exception";

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

    const mockedLogger = mock<Logger>();

    const exceptionHandler = new ExceptionHandler(mockedLogger);

    const mockedArgumentsHost = mock<ArgumentsHost>();
    mockedArgumentsHost.switchToHttp
        .calledWith()
        .mockReturnValue({ getResponse, getRequest } as any);

    it("Should log error BaseException", () => {
        const exception = new UserDatabaseGatewayException(stack);

        exceptionHandler.catch(exception, mockedArgumentsHost);

        expect(mockedLogger.error).toBeCalledWith(
            `End Request for ${path}`,
            `method=${method} status=${500} message=${exception.message}`,
            stack || ""
        );

        expect(status).toBeCalledWith(500);
        expect(json).toBeCalledWith(exception);
    });

    it("Should log error HttpException", () => {
        const exception = new HttpException("error", HttpStatus.INTERNAL_SERVER_ERROR);

        exceptionHandler.catch(exception, mockedArgumentsHost);

        expect(mockedLogger.error).toBeCalledWith(
            `End Request for ${path}`,
            `method=${method} status=${500} message=error`,
            anyString()
        );

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

        expect(mockedLogger.error).toBeCalledWith(
            `End Request for ${path}`,
            `method=${method} status=${422} message=${message} errors=firstName should not be empty`,
            anyString()
        );

        expect(status).toBeCalledWith(422);
        expect(json).toBeCalledWith(exception);
    });

    it("Should log error Other Exceptions", () => {
        const exception = new Error();
        exception.stack = undefined;

        exceptionHandler.catch(exception, mockedArgumentsHost);

        expect(mockedLogger.error).toBeCalledWith(
            `End Request for ${path}`,
            `method=${method} status=${500} message=Open Finance Default Error.`,
            anyString()
        );

        expect(status).toBeCalledWith(500);
        expect(json).toBeCalledWith(new DefaultException());
    });
});
