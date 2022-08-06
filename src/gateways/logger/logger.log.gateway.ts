import { LoggerMessage } from "./logger.message";

export interface LoggerLogGateway {
    log(loggerMessage: LoggerMessage): void;
}

export const LoggerLogGatewayKey = Symbol("LoggerLogGateway");
