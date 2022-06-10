import { ExecutionContext, CallHandler } from "@nestjs/common";
import { mock, anyFunction } from "jest-mock-extended";
import { when } from "jest-when";
import * as RequestIp from "request-ip";
import * as Operations from "rxjs/operators";

import { LoggerLogGateway } from "../../../../../dist/gateways/logger/logger.log.gateway";
import { LoggingInterceptor } from "../../../../../src/common/interceptors/logger/logger.interceptor";

describe("Tests of LoggingInterceptor", () => {
    it("Should return response", () => {
        const mockedLoggerLogGateway = mock<LoggerLogGateway>();
        const loggingInterceptor = new LoggingInterceptor(mockedLoggerLogGateway);

        const spyOperations = jest.spyOn(Operations, "tap");

        const spyRequestIP = jest.spyOn(RequestIp, "getClientIp");

        const path = "anyPath";
        const method = "anyMethod";
        const ip = "anyIp";

        const getRequest = jest.fn().mockReturnValue({
            path,
            method,
        });

        const mockedPipe = jest.fn();

        when(spyRequestIP).calledWith(getRequest()).mockReturnValue(ip);

        const mockedExecutionContext = mock<ExecutionContext>();
        mockedExecutionContext.switchToHttp.calledWith().mockReturnValue({
            getRequest,
        } as any);

        const mockedCallHandler = mock<CallHandler>();
        mockedCallHandler.handle.calledWith().mockReturnValue({ pipe: mockedPipe } as any);

        loggingInterceptor.intercept(mockedExecutionContext, mockedCallHandler);

        expect(mockedPipe).toBeCalledWith(anyFunction());

        expect(mockedLoggerLogGateway.log).toBeCalledWith(
            `method=${method} ip=${ip}`,
            `Incoming Request on ${path}`
        );

        expect(spyOperations).toBeCalledWith(anyFunction());
    });
});
