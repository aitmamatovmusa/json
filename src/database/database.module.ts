import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/features/author/author.entity';
import Account from 'src/features/accounts/account.entity';
import { Config } from './appConfig/config.entity';
import { Quote } from 'src/features/quote/quote.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Config, Account, Author, Quote],
        synchronize: false,
      }),
    }),
    ConfigModule,
  ],
})
export class DatabaseModule {}
