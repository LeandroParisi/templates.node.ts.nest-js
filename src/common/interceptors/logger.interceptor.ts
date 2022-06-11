import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from "@nestjs/common";
import * as requestIp from "request-ip";
import { Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private logger: Logger;

    constructor() {
        this.logger = new Logger();
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        const ip = requestIp.getClientIp(request).replace("::ffff:", "");

        this.logger.log(`method=${request.method} ip=${ip}`, `Incoming Request on ${request.path}`);

        return next.handle();
    }
}
