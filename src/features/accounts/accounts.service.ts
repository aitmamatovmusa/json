import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Account from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  async getAccount() {}

  async createAccount(accountData: RegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, email, password } = accountData;
    // this.accountsRepository.create({ fullname, email });
    return 'account';
  }
}
