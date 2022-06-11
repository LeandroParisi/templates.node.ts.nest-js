import { Logger } from "@nestjs/common";

import { LoggerGatewayNest } from "../../../../../src/gateways/logger/nest-js/logger.gateway.nest";

describe("Tests of LoggerGatewayNest", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const message = "anyMessage";
    const context = "anyContext";

    const loggerGatewayNest = new LoggerGatewayNest();

    it("Should execute debug with success", () => {
        const mockedDebugLogger = jest.spyOn(Logger.prototype, "debug");

        loggerGatewayNest.debug(message, context);

        expect(mockedDebugLogger).toBeCalledWith(message, context);
    });

    it("Should not execute debug because production env", () => {
        process.env.NODE_ENV = "production";

        const mockedDebugLogger = jest.spyOn(Logger.prototype, "debug");

        loggerGatewayNest.debug(message, context);

        expect(mockedDebugLogger).not.toBeCalledWith(message, context);
    });

    it("Should execute log with success", () => {
        const mockedLogLogger = jest.spyOn(Logger.prototype, "log");

        loggerGatewayNest.log(message, context);

        expect(mockedLogLogger).toBeCalledWith(message, context);
    });

    it("Should execute error with success", () => {
        const trace = "anyTrace";

        const mockedErrorLogger = jest.spyOn(Logger.prototype, "error");

        loggerGatewayNest.error(message, context, trace);

        expect(mockedErrorLogger).toBeCalledWith(message, context, trace);
    });

    it("Should execute warn with success", () => {
        const mockedWarnLogger = jest.spyOn(Logger.prototype, "warn");

        loggerGatewayNest.warn(message, context);

        expect(mockedWarnLogger).toBeCalledWith(message, context);
    });

    it("Should execute verbose with success", () => {
        process.env.NODE_ENV = "development";

        const mockedVerboseLogger = jest.spyOn(Logger.prototype, "verbose");

        loggerGatewayNest.verbose(message, context);

        expect(mockedVerboseLogger).toBeCalledWith(message, context);
    });

    it("Should not execute verbose with success because production env", () => {
        process.env.NODE_ENV = "production";

        const mockedVerboseLogger = jest.spyOn(Logger.prototype, "verbose");

        loggerGatewayNest.verbose(message, context);

        expect(mockedVerboseLogger).not.toBeCalledWith(message, context);
    });
});
