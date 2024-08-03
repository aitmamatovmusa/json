import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Account from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/features/auth/auth.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AccountsService {
  constructor(
    @Inject() private passwordService: PasswordService,
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  async validateUser(): Promise<boolean> {
    return false;
  }

  async findAccountByEmail(email: string): Promise<Account> {
    return await this.accountsRepository.findOne({ where: { email } });
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
