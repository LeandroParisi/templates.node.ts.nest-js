import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Inject } from "@nestjs/common";
import { Observable } from "rxjs";

import { LoggerLogGateway } from "@gateways/logger/interfaces/logger.log.gateway";

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
    constructor(@Inject(LoggerLogGateway) private readonly loggerLogGateway: LoggerLogGateway) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        this.loggerLogGateway.log({
            class: context.getClass().name,
            method: context.getHandler().name,
            meta: context.switchToHttp().getRequest().body,
        });

        return next.handle().pipe();
    }
}
