import { mock, MockProxy } from "jest-mock-extended";
import { Logger } from "winston";

import { LoggerMessage } from "../../../../../src/gateways/logger/logger.message";
import { LoggerGatewayWinston } from "../../../../../src/gateways/logger/winston/logger.gateway.winston";

describe("Tests of LoggerGatewayNest", () => {
    let mockedLoggerWinston: MockProxy<Logger>;

    let loggerGatewayWinston: LoggerGatewayWinston;

    const loggerMessage: LoggerMessage = LoggerMessage.builder()
        .class("anyClass")
        .meta("anyMeta")
        .method("anyMethod")
        .build();

    beforeEach(() => {
        jest.clearAllMocks();
        mockedLoggerWinston = mock<Logger>();
        loggerGatewayWinston = new LoggerGatewayWinston(mockedLoggerWinston);
    });

    it("Should execute debug with success", () => {
        loggerGatewayWinston.debug(loggerMessage);

        expect(mockedLoggerWinston.debug).toBeCalledWith({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    });

    it("Should not execute debug because production env", () => {
        process.env.NODE_ENV = "production";

        loggerGatewayWinston.debug(loggerMessage);

        expect(mockedLoggerWinston.debug).not.toBeCalledWith({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    });

    it("Should execute log with success", () => {
        loggerGatewayWinston.log(loggerMessage);

        expect(mockedLoggerWinston.log).toBeCalledWith({
            level: "info",
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    });

    it("Should execute error with success", () => {
        loggerGatewayWinston.error(loggerMessage);

        expect(mockedLoggerWinston.error).toBeCalledWith({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    });

    it("Should execute warn with success", () => {
        loggerGatewayWinston.warn(loggerMessage);

        expect(mockedLoggerWinston.warn).toBeCalledWith({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    });

    it("Should execute verbose with success", () => {
        process.env.NODE_ENV = "development";

        loggerGatewayWinston.verbose(loggerMessage);

        expect(mockedLoggerWinston.verbose).toBeCalledWith({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    });

    it("Should execute verbose with success meta string", () => {
        process.env.NODE_ENV = "development";

        const message = LoggerMessage.builder()
            .class("anyClass")
            .meta({ any: "any" })
            .method("anyMethod")
            .build();

        loggerGatewayWinston.verbose(message);

        expect(mockedLoggerWinston.verbose).toBeCalledWith({
            message: `${message.class}:${message.method}`,
            meta: message.meta,
        });
    });

    it("Should not execute verbose with success because production env", () => {
        process.env.NODE_ENV = "production";

        loggerGatewayWinston.verbose(loggerMessage);

        expect(mockedLoggerWinston.verbose).not.toBeCalledWith({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    });
});
