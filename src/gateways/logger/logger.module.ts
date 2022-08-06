import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";

import { LoggerDebugGatewayKey } from "./logger.debug.gateway";
import { LoggerErrorGatewayKey } from "./logger.error.gateway";
import { LoggerLogGatewayKey } from "./logger.log.gateway";
import { LoggerVerboseGatewayKey } from "./logger.verbose.gateway";
import { LoggerWarnGatewayKey } from "./logger.warn.gateway";
import { configuration } from "./winston/configutation/configuration.logger.winston";
import { LoggerGatewayWinston } from "./winston/logger.gateway.winston";

@Module({
    providers: [
        {
            provide: LoggerDebugGatewayKey,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerLogGatewayKey,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerVerboseGatewayKey,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerWarnGatewayKey,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerErrorGatewayKey,
            useClass: LoggerGatewayWinston,
        },
    ],
    exports: [
        LoggerDebugGatewayKey,
        LoggerLogGatewayKey,
        LoggerVerboseGatewayKey,
        LoggerWarnGatewayKey,
        LoggerErrorGatewayKey,
    ],
    imports: [WinstonModule.forRoot(configuration)],
})
export class LoggerModule {}
