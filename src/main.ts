import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { ExceptionHandler } from "src/common/filters/exception/exception.handler";
import { ResponseFormat } from "src/common/interceptors/response/response.format";
import { ResponseInterceptor } from "src/common/interceptors/response/response.interceptor";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalFilters(new ExceptionHandler());

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(new ResponseInterceptor());

    app.setGlobalPrefix("api_v1");

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("Clean Architecture Nestjs")
        .setDescription("Example with user")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [ResponseFormat],
        deepScanRoutes: true,
    });
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
