import { Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AccountsService } from 'src/features/accounts/accounts.service';
import { Session } from 'express-session';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService) {}

  login() {
    return this.accountsService.login();
  }

  async register(registerData: RegisterDto, session: Session) {
    const userAccount = await this.accountsService.findAccountByEmail(
      registerData.email,
    );
    if (userAccount) {
      return {
        error: 'User with this email already exists',
      };
    }

    await this.accountsService.createAccount(registerData);
    session.save();
  }
}
