import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";

import { LoggerDebugGateway } from "./interfaces/logger.debug.gateway";
import { LoggerErrorGateway } from "./interfaces/logger.error.gateway";
import { LoggerLogGateway } from "./interfaces/logger.log.gateway";
import { LoggerVerboseGateway } from "./interfaces/logger.verbose.gateway";
import { LoggerWarnGateway } from "./interfaces/logger.warn.gateway";
import { configuration } from "./winston/configutation/configuration.logger.winston";
import { LoggerGatewayWinston } from "./winston/logger.gateway.winston";

@Module({
    providers: [
        {
            provide: LoggerDebugGateway,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerLogGateway,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerVerboseGateway,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerWarnGateway,
            useClass: LoggerGatewayWinston,
        },
        {
            provide: LoggerErrorGateway,
            useClass: LoggerGatewayWinston,
        },
    ],
    exports: [
        LoggerDebugGateway,
        LoggerLogGateway,
        LoggerVerboseGateway,
        LoggerWarnGateway,
        LoggerErrorGateway,
    ],
    imports: [WinstonModule.forRoot(configuration)],
})
export class LoggerModule {}
