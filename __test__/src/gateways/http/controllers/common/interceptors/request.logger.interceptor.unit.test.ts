import { CallHandler } from "@nestjs/common";
import { mock } from "jest-mock-extended";

import { RequestLoggerInterceptor } from "../../../../../../../src/gateways/http/controllers/common/interceptors/request.logger.interceptor";
import { LoggerLogGateway } from "../../../../../../../src/gateways/logger/logger.log.gateway";

describe("Tests of RequestLoggerInterceptor", () => {
    it("Should return response", () => {
        const mockedLoggerLogGateway = mock<LoggerLogGateway>();
        const loggingInterceptor = new RequestLoggerInterceptor(mockedLoggerLogGateway);

        const className = "anyClass";
        const methodName = "anyMethod";
        const body = { any: "any" };

        const getClass = jest.fn().mockReturnValue({
            name: className,
        });

        const getHandler = jest.fn().mockReturnValue({
            name: methodName,
        });

        const getRequest = jest.fn().mockReturnValue({
            body,
        });

        const switchToHttp = jest.fn().mockReturnValue({
            getRequest,
        });

        const context = {
            getRequest,
            getClass,
            getHandler,
            switchToHttp,
        } as any;

        const mockedPipe = jest.fn();

        const next = mock<CallHandler>();
        next.handle.calledWith().mockReturnValue({ pipe: mockedPipe } as any);

        loggingInterceptor.intercept(context, next);

        expect(mockedPipe).toBeCalledWith();

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: className,
            meta: body,
            method: methodName,
        });
    });
});
