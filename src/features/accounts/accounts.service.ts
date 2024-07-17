import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Account from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { pbkdf2, randomBytes } from 'crypto';

@Injectable()
export class AccountsService {
  private saltLength: number;
  private iterations: number;
  private keylen: number;
  private digest: string;

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {
    this.saltLength = parseInt(this.configService.get<string>('SALT_LENGTH'));
    this.iterations = parseInt(
      this.configService.get<string>('HASH_ITERATIONS'),
    );
    this.keylen = parseInt(this.configService.get<string>('HASH_KEYLEN'));
    this.digest = this.configService.get<string>('HASH_DIGEST');
  }

  async login() {
    return await this.cacheManager.get<string>('token');
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      pbkdf2(
        password,
        salt,
        this.iterations,
        this.keylen,
        this.digest,
        (err, derivedKey) => {
          if (err) reject(err);
          resolve(derivedKey.toString('hex'));
        },
      );
    });
  }

  generateSalt(): string {
    return randomBytes(this.saltLength).toString('hex');
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = {
      username,
      salt: 'stored_salt',
      password: 'stored_hashed_password',
    };

    const hashedPassword = await this.hashPassword(password, user.salt);
    return hashedPassword === user.password;
  }

  async createAccount({ fullname, email, password }: RegisterDto) {
    const salt = this.generateSalt();
    const hash = await this.hashPassword(password, salt);

    // const account = await this.accountsRepository.create({
    //   fullname,
    //   email,
    //   password: hash,
    // });
    // await this.accountsRepository.save(account);
    // return account;
    return hash;
  }
}
