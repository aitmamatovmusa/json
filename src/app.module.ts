import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

@Module({
  imports: [ConfigModule.forRoot(), RedisModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
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
