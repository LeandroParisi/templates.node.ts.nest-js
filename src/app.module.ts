import {
    Module,
    NestModule,
    MiddlewareConsumer,
    CacheModule,
    CacheModuleOptions,
} from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import * as redisStore from "cache-manager-redis-store";

import { TypeOrmConfigModule } from "@gateways/database/user/postgres/typeorm.module";
import { UserControllerModule } from "@gateways/http/controllers/user/user.controller.module";
import { LoggerModule } from "@gateways/logger/logger.module";

import { EnvironmentConfigService } from "@common/environment/app-configuration.service";
import { EnvironmentConfigModule } from "@common/environment/app.configuration.module";
import { LoggerMiddleware } from "@common/middlewares/logger/logger.middleware";

const redisFactory = (config: EnvironmentConfigService): CacheModuleOptions => {
    return {
        store: redisStore,
        host: config.getRedisHost(),
        port: config.getRedisPort(),
        auth_pass: config.getRedisPassword(),
        isGlobal: true,
    };
};

@Module({
    imports: [
        UserControllerModule,
        EnvironmentConfigModule,
        TypeOrmConfigModule,
        LoggerModule,
        CacheModule.registerAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: redisFactory,
        }),
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
