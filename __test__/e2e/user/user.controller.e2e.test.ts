import faker from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { Repository } from "typeorm";

import { AppModule } from "../../../src/app.module";
import { UserEntity } from "../../../src/gateways/database/data/user.entity";
import { CreateUserRequest } from "../../../src/gateways/http/controllers/user/json/create.user.request";

describe("AppController (e2e)", () => {
    let app: INestApplication;
    let userRepository: Repository<UserEntity>;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        userRepository = moduleFixture.get("UserEntityRepository");

        await app.init();
    });

    afterAll(() => {
        app.close();
    });

    beforeEach(async () => {
        const allUsers = await userRepository.find();

        for (const user of allUsers) {
            await userRepository.remove([user]);
        }
    });

    it("Should create user with success", async () => {
        const createUserRequest = CreateUserRequest.builder()
            .email(faker.internet.email())
            .firstName(faker.name.firstName())
            .lastName(faker.name.lastName())
            .password(faker.internet.password(8))
            .build();

        await request(app.getHttpServer()).post("/user/create").send(createUserRequest).expect(201);

        const userCreate = await userRepository.findOne({
            where: { email: createUserRequest.email },
        });

        expect(userCreate).toBeTruthy();
    });

    it("Should create user with error user already exists", async () => {
        const createUserRequest = CreateUserRequest.builder()
            .email(faker.internet.email())
            .firstName(faker.name.firstName())
            .lastName(faker.name.lastName())
            .password(faker.internet.password(8))
            .build();

        await request(app.getHttpServer()).post("/user/create").send(createUserRequest).expect(201);

        const response = await request(app.getHttpServer())
            .post("/user/create")
            .send(createUserRequest)
            .expect(422);

        expect(response.statusCode).toEqual(422);
    });
});
