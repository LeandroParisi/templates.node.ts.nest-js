import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

import { TypeOrmConfigModule } from "@gateways/database/user/postgres/typeorm.module";
import { UserDataBaseGatewayModule } from "@gateways/database/user/user.database.gateway.module";
import { ControllersModule } from "@gateways/http/controllers/user/user.controller.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { UseCasesModule } from "@use-cases/user/usecase.module";

import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";
import { LoggerMiddleware } from "@common/middlewares/logger/logger.middleware";

@Module({
    imports: [
        ControllersModule,
        EnvironmentConfigModule,
        TypeOrmConfigModule,
        LoggerModule,
        UserDataBaseGatewayModule,
        UseCasesModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
