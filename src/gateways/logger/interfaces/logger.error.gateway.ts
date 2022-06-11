export interface LoggerErrorGateway {
    error(message: string, context: string | unknown, trace?: string): void;
}

export const LoggerErrorGateway = Symbol("LoggerErrorGateway");
