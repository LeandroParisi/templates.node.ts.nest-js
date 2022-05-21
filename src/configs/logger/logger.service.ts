import { Injectable, Logger } from "@nestjs/common";

import { ILogger } from "./logger.interface";

@Injectable()
export class LoggerService extends Logger implements ILogger {
    public debug(context: string, message: string) {
        if (process.env.NODE_ENV !== "production") {
            super.debug(message, context);
        }
    }

    public log(context: string, message: string | any) {
        super.log(message, context);
    }

    public error(context: string | unknown, message: string, trace?: string) {
        super.error(message, trace, context);
    }

    public warn(context: string, message: string) {
        super.warn(message, context);
    }

    public verbose(context: string, message: string) {
        if (process.env.NODE_ENV !== "production") {
            super.verbose(message, context);
        }
    }
}
