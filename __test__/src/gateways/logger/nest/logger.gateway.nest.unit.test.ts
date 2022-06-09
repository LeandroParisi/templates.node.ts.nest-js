import { Logger } from "@nestjs/common";
import { mock } from "jest-mock-extended";

import { LoggerGatewayNest } from "../../../../../src/gateways/logger/nest-js/logger.gateway.nest";

describe("Tests of LoggerGatewayNest", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const message = "anyMessage";
    const context = "anyContext";

    const mockedLogger = mock<Logger>();

    const loggerGatewayNest = new LoggerGatewayNest(mockedLogger);

    it("Should execute debug with success", () => {
        loggerGatewayNest.debug(message, context);

        expect(mockedLogger.debug).toBeCalledWith(message, context);
    });

    it("Should not execute debug because production env", () => {
        process.env.NODE_ENV = "production";

        loggerGatewayNest.debug(message, context);

        expect(mockedLogger.debug).not.toBeCalledWith(message, context);
    });

    it("Should execute log with success", () => {
        loggerGatewayNest.log(message, context);

        expect(mockedLogger.log).toBeCalledWith(message, context);
    });

    it("Should execute error with success", () => {
        const trace = "anyTrace";
        loggerGatewayNest.error(message, context, trace);

        expect(mockedLogger.error).toBeCalledWith(message, context, trace);
    });

    it("Should execute warn with success", () => {
        loggerGatewayNest.warn(message, context);

        expect(mockedLogger.warn).toBeCalledWith(message, context);
    });

    it("Should execute verbose with success", () => {
        process.env.NODE_ENV = "development";

        loggerGatewayNest.verbose(message, context);

        expect(mockedLogger.verbose).toBeCalledWith(message, context);
    });

    it("Should not execute verbose with success because production env", () => {
        process.env.NODE_ENV = "production";

        loggerGatewayNest.verbose(message, context);

        expect(mockedLogger.verbose).not.toBeCalledWith(message, context);
    });
});
