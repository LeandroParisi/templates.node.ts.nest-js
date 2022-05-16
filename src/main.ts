import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

import { AllExceptionFilter } from "@configs/exeception-handler/exception.filter";
import { ResponseInterceptor, ResponseFormat } from "@configs/interceptor/response.interceptor";
import { LoggerService } from "@configs/logger/logger.service";

import { AppModule } from "./app.module";

async function bootstrap() {
    const env = process.env.NODE_ENV;

    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalInterceptors(new ResponseInterceptor());

    app.setGlobalPrefix("api_v1");

    if (env !== "production") {
        const config = new DocumentBuilder()
            .addBearerAuth()
            .setTitle("Clean Architecture Nestjs")
            .setDescription("Example with todo list")
            .setVersion("1.0")
            .build();
        const document = SwaggerModule.createDocument(app, config, {
            extraModels: [ResponseFormat],
            deepScanRoutes: true,
        });
        SwaggerModule.setup("api", app, document);
    }

    await app.listen(process.env.PORT);
}
bootstrap();
