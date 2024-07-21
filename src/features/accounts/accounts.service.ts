import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Account from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/features/auth/auth.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PasswordService } from './password.service';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject() private passwordService: PasswordService,
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  async login() {
    return await this.cacheManager.get<string>('token');
  }

  async validateUser(): Promise<boolean> {
    return false;
  }

  async createAccount({
    fullname,
    email,
    password,
  }: RegisterDto): Promise<Account> {
    const hash = await this.passwordService.hashPassword(password);

    return await this.accountsRepository.save({
      fullname,
      email,
      password: hash,
    });
  }
}
