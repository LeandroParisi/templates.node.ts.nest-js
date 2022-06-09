export interface LoggerDebugGateway {
    debug(context: string, message: string): void;
}

export const LoggerDebugGateway = Symbol("LoggerDebugGateway");
