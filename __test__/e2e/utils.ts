import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { AppModule } from "../../src/app.module";

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
