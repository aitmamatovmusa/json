import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Account from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { hash } from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  async login() {
    return await this.cacheManager.get<string>('token');
  }

  async createAccount(accountData: RegisterDto) {
    const { fullname, email, password } = accountData;

    const saltOrRounds = 10;
    const passwordHash = await hash(password, saltOrRounds);
    const account = await this.accountsRepository.create({
      fullname,
      email,
      password: passwordHash,
    });
    await this.accountsRepository.save(account);

    return account;
  }
}
