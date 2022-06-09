import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { mock } from "jest-mock-extended";

import { ResponseInterceptor } from "../../../../../src/common/interceptors/response/response.interceptor";

describe("Tests of ResponseInterceptor", () => {
    it("Should return response", () => {
        const responseInterceptor = new ResponseInterceptor();

        const getRequest = jest.fn().mockReturnValue({
            path: "anyPath",
            method: "anyMethod",
        });

        const mockedPipe = jest.fn();

        const mockedExecutionContext = mock<ExecutionContext>();
        mockedExecutionContext.switchToHttp.calledWith().mockReturnValue({
            getRequest,
        } as any);

        const mockedCallHandler = mock<CallHandler>();
        mockedCallHandler.handle.calledWith().mockReturnValue({ pipe: mockedPipe } as any);

        responseInterceptor.intercept(mockedExecutionContext, mockedCallHandler);

        expect(mockedPipe).toBeCalled();
    });
});
