import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Inject } from "@nestjs/common";
import * as requestIp from "request-ip";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { LoggerLogGateway } from "@gateways/logger/logger.log.gateway";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject(LoggerLogGateway) private readonly LoggerLogGateway: LoggerLogGateway) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        const ip = requestIp.getClientIp(request);

        this.LoggerLogGateway.log(
            `method=${request.method} ip=${ip}`,
            `Incoming Request on ${request.path}`
        );

        const tapPipe = tap(() => {
            this.LoggerLogGateway.log(
                `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
                `End Request for ${request.path}`
            );
        });

        return next.handle().pipe(tapPipe);
    }
}
