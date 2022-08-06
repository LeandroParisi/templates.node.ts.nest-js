import { CallHandler } from "@nestjs/common";
import { mock } from "jest-mock-extended";
import * as RXJ from "rxjs/operators";

import { ResponseAuthMapperInterceptor } from "../../../../../../../src/gateways/http/controllers/authentication/interceptors/response.auth.mapper.interceptor";
import { AuthenticationResponseJson } from "../../../../../../../src/gateways/http/controllers/authentication/json/authentication.response.json";
import { UserDataBuilder } from "../../../../../../data-builders/domains/index";

describe("Tests of ResponseMapperInterceptor", () => {
    it("Should be return mapped response", () => {
        const mockedSetHeader = jest.fn();
        const mockedGetResponse = jest.fn().mockReturnValue({ setHeader: mockedSetHeader });
        const mockedSwitchToHttp = jest.fn().mockReturnValue({ getResponse: mockedGetResponse });
        const mockedContext = { switchToHttp: mockedSwitchToHttp };

        const responseAuthMapperInterceptor = new ResponseAuthMapperInterceptor();
        const user = UserDataBuilder.fullUser.build();

        const expectedUserResponse = AuthenticationResponseJson.builder()
            .email(user.email)
            .firstName(user.firstName)
            .id(user.id)
            .lastName(user.lastName)
            .build();

        const mockMap = (callback: any) => callback(user);
        jest.spyOn(RXJ, "map").mockImplementation(mockMap);

        const mockedPipe = jest.fn().mockReturnValue(mockMap);

        const next = mock<CallHandler>();
        next.handle.calledWith().mockReturnValue({ pipe: mockedPipe } as any);

        responseAuthMapperInterceptor.intercept(mockedContext as any, next);

        expect(mockedSetHeader).toBeCalledWith("ACCESS_TOKEN", user.accessToken);
        expect(mockedSetHeader).toBeCalledWith("REFRESH_TOKEN", user.refreshToken);

        expect(mockedPipe).toBeCalledWith(expectedUserResponse);
    });
});
