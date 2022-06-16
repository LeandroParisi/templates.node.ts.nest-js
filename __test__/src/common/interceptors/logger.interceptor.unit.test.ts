import { ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { mock } from "jest-mock-extended";
import { when } from "jest-when";
import * as RequestIp from "request-ip";

import { LoggerRequestInterceptor } from "../../../../src/common/interceptors/logger.request.interceptor";

jest.mock("rxjs/operators", () => {
    const operation = jest.fn();

    return { tap: jest.fn(() => operation) };
});

describe("Tests of LoggingInterceptor", () => {
    it("Should return response", () => {
        const mockedLogger = jest.spyOn(Logger.prototype, "log");
        const loggingInterceptor = new LoggerRequestInterceptor();

        const spyRequestIP = jest.spyOn(RequestIp, "getClientIp");

        const path = "anyPath";
        const method = "anyMethod";
        const ip = "anyIp";

        const getRequest = jest.fn().mockReturnValue({
            path,
            method,
        });

        when(spyRequestIP).calledWith(getRequest()).mockReturnValue(ip);

        const mockedExecutionContext = mock<ExecutionContext>();
        mockedExecutionContext.switchToHttp.calledWith().mockReturnValue({
            getRequest,
        } as any);

        const mockedCallHandler = mock<CallHandler>();

        loggingInterceptor.intercept(mockedExecutionContext, mockedCallHandler);

        expect(mockedLogger).toBeCalledWith(
            `method=${method} ip=${ip}`,
            `Incoming Request on ${path}`
        );
    });
});
