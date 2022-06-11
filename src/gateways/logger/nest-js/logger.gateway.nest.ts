import { Injectable, Logger } from "@nestjs/common";

import { LoggerDebugGateway } from "../interfaces/logger.debug.gateway";
import { LoggerErrorGateway } from "../interfaces/logger.error.gateway";
import { LoggerLogGateway } from "../interfaces/logger.log.gateway";
import { LoggerVerboseGateway } from "../interfaces/logger.verbose.gateway";
import { LoggerWarnGateway } from "../interfaces/logger.warn.gateway";

@Injectable()
export class LoggerGatewayNest
    implements
        LoggerDebugGateway,
        LoggerLogGateway,
        LoggerVerboseGateway,
        LoggerWarnGateway,
        LoggerErrorGateway
{
    private logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    public debug(message: string, context: string) {
        if (process.env.NODE_ENV !== "production") {
            this.logger.debug(message, context);
        }
    }

    public log(message: string | unknown, context: string) {
        this.logger.log(message, context);
    }

    public error(message: string, context: string | unknown, trace?: string) {
        this.logger.error(message, context, trace);
    }

    public warn(message: string, context: string) {
        this.logger.warn(message, context);
    }

    public verbose(message: string, context: string) {
        if (process.env.NODE_ENV !== "production") {
            this.logger.verbose(message, context);
        }
    }
}
