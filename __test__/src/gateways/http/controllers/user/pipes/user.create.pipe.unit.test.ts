import faker from "@faker-js/faker";

import { CreateUserRequestJson } from "../../../../../../../src/gateways/http/controllers/user/json/create.user.request.json";
import { UserCreatePipe } from "../../../../../../../src/gateways/http/controllers/user/pipes/user.create.pipe";

describe("Tests of UserCreatePipe", () => {
    it("Should return user mapped", async () => {
        const createUserRequest = CreateUserRequestJson.builder()
            .email(faker.internet.email())
            .firstName(faker.name.firstName())
            .lastName(faker.name.lastName())
            .password(faker.internet.password(8))
            .build();

        const userCreatePipe = new UserCreatePipe();

        const userToCreate = await userCreatePipe.transform(createUserRequest);

        expect(userToCreate).toEqual(createUserRequest);
    });
});
