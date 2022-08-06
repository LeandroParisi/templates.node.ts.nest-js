import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { Repository } from "typeorm";

import { AppModule } from "../../src/app.module";
import { UserEntity } from "../../src/gateways/database/data/user.entity";

let server: INestApplication;

export async function startTestServer() {
    const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    if (!server) {
        server = moduleFixture.createNestApplication();
    }

    return server;
}

export async function crateUserToUseOnTests(
    userRepository: Repository<UserEntity>,
    userEntities: UserEntity[]
) {
    return await userRepository.save(userEntities);
}

export async function deleteAllUsersBeforeTests(userRepository: Repository<UserEntity>) {
    const allUsers = await userRepository.find();

    for (const user of allUsers) {
        await userRepository.remove([user]);
    }
}

export async function authenticate(email: string, password: string) {
    const authenticationResponse = await request(server.getHttpServer())
        .post("/auth/login")
        .send({ email, password })
        .expect(201);

    return authenticationResponse.headers["access_token"];
}
