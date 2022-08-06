import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { Repository } from "typeorm";

import { UserEntity } from "../../../src/gateways/database/data/user.entity";
import { UserEntityDataBuilder } from "../../data-builders/data/index";
import { startTestServer, crateUserToUseOnTests, deleteAllUsersBeforeTests } from "../utils";

describe("Tests e2e UserController", () => {
    let server: INestApplication;
    let userRepository: Repository<UserEntity>;

    beforeAll(async () => {
        server = await startTestServer();
        userRepository = server.get("UserEntityRepository");

        await server.init();
    });

    afterAll(async () => {
        await server.close();
    });

    describe("Should be execute tests to authenticate a user", () => {
        beforeEach(async () => {
            await deleteAllUsersBeforeTests(userRepository);
        });

        const user = UserEntityDataBuilder.create.build();

        const email = user.email;
        const password = user.password;

        it("Should be authenticated user with success", async () => {
            const usersCreated = await crateUserToUseOnTests(userRepository, [user]);

            const userResponseExpected = usersCreated[0];

            const response = await request(server.getHttpServer())
                .post("/auth/login")
                .send({ email, password })
                .expect(201);

            expect(response.body.id).toEqual(userResponseExpected.id);
            expect(response.headers["access_token"]).toBeTruthy();
            expect(response.headers["refresh_token"]).toBeTruthy();
        });

        it("Should be authenticated user with error invalid credentials", async () => {
            const response = await request(server.getHttpServer())
                .post("/auth/login")
                .send({ email, password: "anyPassword" });

            expect(response.statusCode).toEqual(401);
        });
    });
});
