import { mock, anyString } from "jest-mock-extended";
import { when } from "jest-when";
import * as RequestIp from "request-ip";

import { LoggerMiddleware } from "../../../../../src/common/middlewares/logger/logger.middleware";
import { LoggerLogGateway } from "../../../../../src/gateways/logger/logger.log.gateway";

describe("Tests of LoggerMiddleware", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should log request", () => {
        const path = "anyPath";
        const method = "anyMethod";
        const ip = "anyIp";

        const requestOn = jest.fn((_, callback) => callback());

        const responseOn = jest.fn();

        const request = { path, method, on: requestOn } as any;

        const response = { on: responseOn } as any;

        const next = jest.fn();

        const spyRequestIP = jest.spyOn(RequestIp, "getClientIp");

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        const loggerMiddleware = new LoggerMiddleware(mockedLoggerLogGateway);

        when(spyRequestIP).calledWith(request).mockReturnValue(ip);

        loggerMiddleware.use(request, response, next);

        expect(next).toBeCalled();

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "LoggerMiddleware",
            method: "request",
            meta: { ip: ip, method: request.method, date: anyString(), path: request.path },
        });
    });

    it("Should log response", () => {
        const path = "anyPath";
        const method = "anyMethod";
        const ip = "anyIp";

        const requestOn = jest.fn();

        const responseOn = jest.fn((_, callback) => callback());

        const request = { path, method, on: requestOn } as any;

        const response = { on: responseOn, statusCode: 200 } as any;

        const next = jest.fn();

        const spyRequestIP = jest.spyOn(RequestIp, "getClientIp");

        const mockedLoggerLogGateway = mock<LoggerLogGateway>();

        const loggerMiddleware = new LoggerMiddleware(mockedLoggerLogGateway);

        when(spyRequestIP).calledWith(request).mockReturnValue(ip);

        loggerMiddleware.use(request, response, next);

        expect(next).toBeCalled();
        expect(responseOn).toBeCalled();

        expect(mockedLoggerLogGateway.log).toBeCalledWith({
            class: "LoggerMiddleware",
            method: "response",
            meta: {
                ip: ip,
                method: request.method,
                date: anyString(),
                path: request.path,
                status: response.statusCode,
            },
        });
    });
});
