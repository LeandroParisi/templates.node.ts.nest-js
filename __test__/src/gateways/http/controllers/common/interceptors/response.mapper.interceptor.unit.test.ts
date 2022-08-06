import { CallHandler } from "@nestjs/common";
import { mock } from "jest-mock-extended";
import * as RXJ from "rxjs/operators";

import { ResponseMapperInterceptor } from "../../../../../../../src/gateways/http/controllers/common/interceptors/response.mapper.interceptor";
import { FindAllResponseJson } from "../../../../../../../src/gateways/http/controllers/user/json/find.all.response.json";
import { UserDataBuilder } from "../../../../../../data-builders/domains/index";

describe("Tests of ResponseMapperInterceptor", () => {
    it("Should be return mapped response", () => {
        const responseMapperInterceptor = new ResponseMapperInterceptor(FindAllResponseJson);
        const user = UserDataBuilder.fullUser.build();

        const mockMap = (callback: any) => callback(user);
        jest.spyOn(RXJ, "map").mockImplementation(mockMap);

        const mockedPipe = jest.fn().mockReturnValue(mockMap);

        const next = mock<CallHandler>();
        next.handle.calledWith().mockReturnValue({ pipe: mockedPipe } as any);

        responseMapperInterceptor.intercept({} as any, next);

        expect(mockedPipe).toBeCalledWith([]);
    });
});
