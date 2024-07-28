import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AccountsService } from 'src/features/accounts/accounts.service';
import { Session } from 'express-session';
import { PasswordService } from '../accounts/password.service';
import { UserNotFoundException } from 'src/common/filters/userNotFound.filter';
import { WrongPasswordException } from 'src/common/filters/wrongPassword.filter';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly passwordService: PasswordService,
  ) {}

  async login({ email, password }: LoginDto, session: Session) {
    const userAccount = await this.accountsService.findAccountByEmail(email);
    if (!userAccount) {
      throw new UserNotFoundException();
    }

    const match = await this.passwordService.comparePasswords({
      password,
      storedHash: userAccount.password,
    });
    if (!match) {
      throw new WrongPasswordException();
    }

    // session.save();
    // return { token: session.id };
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
