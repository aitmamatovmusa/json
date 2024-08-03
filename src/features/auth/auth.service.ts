import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AccountsService } from 'src/features/accounts/accounts.service';
import { Session } from 'express-session';
import { PasswordService } from '../accounts/password.service';
import { UserNotFoundException } from 'src/common/filters/userNotFound.filter';
import { WrongPasswordException } from 'src/common/filters/wrongPassword.filter';
import { UserAlreadyExistsException } from 'src/common/filters/userAlreadyExists.filter';
import { LoginResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly passwordService: PasswordService,
  ) {}

  async login(
    { email, password }: LoginDto,
    session: Session,
  ): Promise<LoginResponse> {
    const userAccount = await this.accountsService.findAccountByEmail(email);
    if (!userAccount) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await this.passwordService.comparePasswords({
      password,
      storedHash: userAccount.password,
    });
    if (!isPasswordValid) {
      throw new WrongPasswordException();
    }

    session.save();
    return { token: session.id };
  }

  async register(registerData: RegisterDto, session: Session): Promise<void> {
    const userAccount = await this.accountsService.findAccountByEmail(
      registerData.email,
    );
    if (userAccount) {
      throw new UserAlreadyExistsException();
    }

    await this.accountsService.createAccount(registerData);
    session.save();
  }
}
