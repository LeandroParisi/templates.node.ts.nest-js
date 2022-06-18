import { Injectable, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

import { LoggerDebugGateway } from "../interfaces/logger.debug.gateway";
import { LoggerErrorGateway } from "../interfaces/logger.error.gateway";
import { LoggerLogGateway } from "../interfaces/logger.log.gateway";
import { LoggerMessage } from "../interfaces/logger.message";
import { LoggerVerboseGateway } from "../interfaces/logger.verbose.gateway";
import { LoggerWarnGateway } from "../interfaces/logger.warn.gateway";

@Injectable()
export class LoggerGatewayWinston
    implements
        LoggerDebugGateway,
        LoggerLogGateway,
        LoggerVerboseGateway,
        LoggerWarnGateway,
        LoggerErrorGateway
{
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    public debug(loggerMessage: LoggerMessage) {
        if (process.env.NODE_ENV !== "production") {
            this.logger.debug({
                message: `${loggerMessage.class}:${loggerMessage.method}`,
                meta: loggerMessage.meta,
            });
        }
    }

    public log(loggerMessage: LoggerMessage) {
        this.logger.log({
            level: "info",
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    }

    public error(loggerMessage: LoggerMessage) {
        this.logger.error({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    }

    public warn(loggerMessage: LoggerMessage) {
        this.logger.warn({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: loggerMessage.meta,
        });
    }

    public verbose(loggerMessage: LoggerMessage) {
        if (process.env.NODE_ENV !== "production") {
            this.logger.verbose({
                message: `${loggerMessage.class}:${loggerMessage.method}`,
                meta: loggerMessage.meta,
            });
        }
    }
}
