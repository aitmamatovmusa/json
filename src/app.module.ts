import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './features/auth/auth.module';
import { RedisModule } from './database/redis/redis.module';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { AppConfigModule } from './database/appConfig';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './features/auth/auth.guard';
import { AuthorModule } from './features/author/author.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AppConfigModule,
    RedisModule,
    DatabaseModule,
    AuthModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}

  async configure(consumer: MiddlewareConsumer) {
    const redisClient = createClient({
      socket: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
      },
    });

    await redisClient.connect();

    const redisStore = new RedisStore({ client: redisClient });

    consumer
      .apply(
        session({
          store: redisStore,
          secret: this.configService.get('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
          cookie: {
            maxAge: 3600000,
          },
        }),
      )
      .forRoutes('*');
  }
}
