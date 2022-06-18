import { LoggerMessage } from "./logger.message";

export interface LoggerWarnGateway {
    warn(LoggerMessage: LoggerMessage): void;
}

export const LoggerWarnGateway = Symbol("LoggerWarnGateway");
