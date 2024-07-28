import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Account from './account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { PasswordService } from './password.service';

import { AppConfigModule } from 'src/database/appConfig/appConfig.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule, AppConfigModule, TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService, PasswordService],
  exports: [AccountsService, PasswordService],
})
export class AccountsModule {}
