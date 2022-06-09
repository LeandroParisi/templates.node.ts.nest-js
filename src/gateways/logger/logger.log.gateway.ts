export interface LoggerLogGateway {
    log(message: string | unknown, context: string): void;
}

export const LoggerLogGateway = Symbol("LoggerLogGateway");
