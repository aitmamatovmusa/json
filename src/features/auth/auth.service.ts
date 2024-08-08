import { Inject, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AccountsService } from 'src/features/accounts/accounts.service';
import { Session } from 'express-session';
import { PasswordService } from '../accounts/password.service';
import { UserNotFoundException } from 'src/common/filters/userNotFound.filter';
import { WrongPasswordException } from 'src/common/filters/wrongPassword.filter';
import { UserAlreadyExistsException } from 'src/common/filters/userAlreadyExists.filter';
import { LoginResponse } from './types';
import { Request, Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { buildSessionId } from 'src/common/utils/session';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly passwordService: PasswordService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

    (session as any).news = '';
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

  async logout(request: Request, response: Response) {
    const sessionId = buildSessionId(request.sessionID);
    await this.cacheManager.del(sessionId);
    response.clearCookie('connect.sid');
  }
}
