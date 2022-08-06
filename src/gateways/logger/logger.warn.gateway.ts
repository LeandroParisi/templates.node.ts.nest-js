import { LoggerMessage } from "./logger.message";

export interface LoggerWarnGateway {
    warn(LoggerMessage: LoggerMessage): void;
}

export const LoggerWarnGatewayKey = Symbol("LoggerWarnGateway");
