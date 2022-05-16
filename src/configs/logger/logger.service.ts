import { Injectable, Logger } from "@nestjs/common";

import { ILogger } from "./logger.interface";

@Injectable()
export class LoggerService extends Logger implements ILogger {
    public debug(context: string, message: string) {
        if (process.env.NODE_ENV !== "production") {
            super.debug(`[DEBUG] ${message}`, context);
        }
    }

    public log(context: string, message: string) {
        super.log(`[INFO] ${message}`, context);
    }

    public error(context: string, message: string, trace?: string) {
        super.error(`[ERROR] ${message}`, trace, context);
    }

    public warn(context: string, message: string) {
        super.warn(`[WARN] ${message}`, context);
    }

    public verbose(context: string, message: string) {
        if (process.env.NODE_ENV !== "production") {
            super.verbose(`[VERBOSE] ${message}`, context);
        }
    }
}
