import { Module } from "@nestjs/common";

import { LoggerDebugGateway } from "./interfaces/logger.debug.gateway";
import { LoggerErrorGateway } from "./interfaces/logger.error.gateway";
import { LoggerLogGateway } from "./interfaces/logger.log.gateway";
import { LoggerVerboseGateway } from "./interfaces/logger.verbose.gateway";
import { LoggerWarnGateway } from "./interfaces/logger.warn.gateway";
import { LoggerGatewayNest } from "./nest-js/logger.gateway.nest";

@Module({
    providers: [
        {
            provide: LoggerDebugGateway,
            useClass: LoggerGatewayNest,
        },
        {
            provide: LoggerLogGateway,
            useClass: LoggerGatewayNest,
        },
        {
            provide: LoggerVerboseGateway,
            useClass: LoggerGatewayNest,
        },
        {
            provide: LoggerWarnGateway,
            useClass: LoggerGatewayNest,
        },
        {
            provide: LoggerErrorGateway,
            useClass: LoggerGatewayNest,
        },
    ],
    exports: [LoggerDebugGateway, LoggerLogGateway, LoggerVerboseGateway, LoggerWarnGateway],
})
export class LoggerModule {}
