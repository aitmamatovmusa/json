import { Module } from '@nestjs/common';
import { AuthContoller } from './auth.controller';
import { AccountsModule } from 'src/features/accounts/accounts.module';
import { AuthService } from './auth.service';

@Module({
  imports: [AccountsModule],
  controllers: [AuthContoller],
  providers: [AuthService],
})
export class AuthModule {}
