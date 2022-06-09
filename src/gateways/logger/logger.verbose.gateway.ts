export interface LoggerVerboseGateway {
    verbose(context: string, message: string): void;
}

export const LoggerVerboseGateway = Symbol("LoggerVerboseGateway");
