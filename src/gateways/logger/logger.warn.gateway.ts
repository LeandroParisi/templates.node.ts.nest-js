export interface LoggerWarnGateway {
    warn(message: string | unknown, context: string): void;
}

export const LoggerWarnGateway = Symbol("LoggerWarnGateway");
