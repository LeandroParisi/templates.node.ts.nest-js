import { LoggerMessage } from "./logger.message";

export interface LoggerDebugGateway {
    debug(loggerMessage: LoggerMessage): void;
}

export const LoggerDebugGatewayKey = Symbol("LoggerDebugGateway");
