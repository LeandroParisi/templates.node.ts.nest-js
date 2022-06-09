import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Inject } from "@nestjs/common";
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

        const ip = this.getIP(request);

        this.LoggerLogGateway.log(
            `method=${request.method} ip=${ip}`,
            `Incoming Request on ${request.path}`
        );

        return next.handle().pipe(
            tap(() => {
                this.LoggerLogGateway.log(
                    `method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
                    `End Request for ${request.path}`
                );
            })
        );
    }

    private getIP(request: any): string {
        let ip: string;
        const ipAddr = request.headers["x-forwarded-for"];
        if (ipAddr) {
            const list = ipAddr.split(",");
            ip = list[list.length - 1];
        } else {
            ip = request.connection.remoteAddress;
        }
        return ip.replace("::ffff:", "");
    }
}
