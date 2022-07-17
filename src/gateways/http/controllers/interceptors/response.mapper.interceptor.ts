import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { BaseResponseJson } from "../json/base.response.json";

@Injectable()
export class ResponseMapperInterceptor<Target extends BaseResponseJson<unknown>>
    implements NestInterceptor
{
    constructor(private target: { new (): Target }) {}
    intercept(
        _: ExecutionContext,
        next: CallHandler<BaseResponseJson<unknown>>
    ): Observable<unknown> {
        const response = new this.target();

        return next.handle().pipe(
            map((data: unknown) => {
                return response.mapper(data);
            })
        );
    }
}
