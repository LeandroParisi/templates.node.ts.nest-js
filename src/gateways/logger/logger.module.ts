import { Module, Logger } from "@nestjs/common";

import { LoggerDebugGateway } from "./logger.debug.gateway";
import { LoggerErrorGateway } from "./logger.error.gateway";
import { LoggerLogGateway } from "./logger.log.gateway";
import { LoggerVerboseGateway } from "./logger.verbose.gateway";
import { LoggerWarnGateway } from "./logger.warn.gateway";
import { LoggerGatewayNest } from "./nest-js/logger.gateway.nest";

@Module({
    imports: [Logger],
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
