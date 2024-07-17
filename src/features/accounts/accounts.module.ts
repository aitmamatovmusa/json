import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Account from './account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { ConfigModule } from '@nestjs/config';
import { PasswordService } from './password.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService, PasswordService],
  exports: [AccountsService],
})
export class AccountsModule {}
