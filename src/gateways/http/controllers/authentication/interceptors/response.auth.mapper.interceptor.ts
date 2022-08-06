import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "@domain/index";

import { AuthenticationResponseJson } from "../json/authentication.response.json";

@Injectable()
export class ResponseAuthMapperInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<AuthenticationResponseJson>
    ): Observable<unknown> {
        const contextResponse = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            map((user: User) => {
                contextResponse.setHeader("ACCESS_TOKEN", user.accessToken);
                contextResponse.setHeader("REFRESH_TOKEN", user.refreshToken);

                return AuthenticationResponseJson.builder()
                    .email(user.email)
                    .firstName(user.firstName)
                    .id(user.id)
                    .lastName(user.lastName)
                    .build();
            })
        );
    }
}
