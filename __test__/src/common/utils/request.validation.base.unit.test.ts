import faker from "@faker-js/faker";

import { RequestValidationBase } from "../../../../src/common/utils/request.validation.base";
import { CreateUserRequest } from "../../../../src/gateways/http/controllers/user/json/create.user.request";

describe("Tests of RequestValidationBase", () => {
    it("Should checkEmptyBody no payload provided", async () => {
        const requestValidationBase = new RequestValidationBase();

        expect(() => requestValidationBase.checkEmptyBody({})).toThrow(
            "Validation failed: No payload provided."
        );
    });

    it("Should return constraint validation error (password)", async () => {
        const userRequest = CreateUserRequest.builder()
            .email(faker.internet.email())
            .firstName(faker.name.firstName())
            .lastName(faker.name.lastName())
            .build();

        const requestValidationBase = new RequestValidationBase();

        await expect(() =>
            requestValidationBase.validateClass(CreateUserRequest, userRequest)
        ).rejects.toHaveProperty("response", {
            message: ["password must be longer than or equal to 8 characters"],
        });
    });
});
