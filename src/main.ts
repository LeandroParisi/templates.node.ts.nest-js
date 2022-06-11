import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

import { ExceptionHandler } from "@common/filters/exception.filter";
import { LoggingInterceptor } from "@common/interceptors/logger.interceptor";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalFilters(new ExceptionHandler(new Logger()));

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.setGlobalPrefix("api_v1");

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("Clean Architecture Nestjs")
        .setDescription("Example with user")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
    });
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT);
}
bootstrap();
