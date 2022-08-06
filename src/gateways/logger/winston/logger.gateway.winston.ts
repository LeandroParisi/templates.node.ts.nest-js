import { Injectable, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

import { removeKeyOfObject } from "@gateways/logger/winston/removeKeyOfObject";

import { LoggerDebugGateway } from "../logger.debug.gateway";
import { LoggerErrorGateway } from "../logger.error.gateway";
import { LoggerLogGateway } from "../logger.log.gateway";
import { LoggerMessage } from "../logger.message";
import { LoggerVerboseGateway } from "../logger.verbose.gateway";
import { LoggerWarnGateway } from "../logger.warn.gateway";

const fieldsToRemoveFromMeta = ["password"];

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
                meta: this.removeKeysFromMeta(loggerMessage.meta),
            });
        }
    }

    public log(loggerMessage: LoggerMessage) {
        this.logger.log({
            level: "info",
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: this.removeKeysFromMeta(loggerMessage.meta),
        });
    }

    public error(loggerMessage: LoggerMessage) {
        this.logger.error({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: this.removeKeysFromMeta(loggerMessage.meta),
        });
    }

    public warn(loggerMessage: LoggerMessage) {
        this.logger.warn({
            message: `${loggerMessage.class}:${loggerMessage.method}`,
            meta: this.removeKeysFromMeta(loggerMessage.meta),
        });
    }

    public verbose(loggerMessage: LoggerMessage) {
        if (process.env.NODE_ENV !== "production") {
            this.logger.verbose({
                message: `${loggerMessage.class}:${loggerMessage.method}`,
                meta: this.removeKeysFromMeta(loggerMessage.meta),
            });
        }
    }

    private removeKeysFromMeta(meta: unknown) {
        return typeof meta === "object"
            ? removeKeyOfObject(meta, fieldsToRemoveFromMeta as never)
            : meta;
    }
}
