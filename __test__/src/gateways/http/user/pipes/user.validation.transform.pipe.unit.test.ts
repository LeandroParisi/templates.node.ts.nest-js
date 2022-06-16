import faker from "@faker-js/faker";

import { CreateUserRequest } from "../../../../../../src/gateways/http/controllers/user/json/create.user.request";
import { UserValidationTransformPipe } from "../../../../../../src/gateways/http/controllers/user/pipes/user.validation.transform.pipe";

describe("Tests of UserValidationTransformPipe", () => {
    it("Should return user mapped", async () => {
        const userRequest = CreateUserRequest.builder()
            .email(faker.internet.email())
            .firstName(faker.name.firstName())
            .lastName(faker.name.lastName())
            .password(faker.internet.password(8))
            .build();

        const userValidationTransformPipe = new UserValidationTransformPipe();

        const user = await userValidationTransformPipe.transform(userRequest);

        expect(user).toEqual(userRequest);
    });
});
