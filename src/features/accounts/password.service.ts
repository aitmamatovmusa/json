import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { pbkdf2 } from 'crypto';
import { AppConfigService } from 'src/database/appConfig/appConfig.service';

@Injectable()
export class PasswordService {
  private iterations: number;
  private keylen: number;
  private digest: string;

  constructor(
    private configService: ConfigService,
    @Inject() private appConfigService: AppConfigService,
  ) {
    this.iterations = parseInt(
      this.configService.get<string>('HASH_ITERATIONS'),
    );
    this.keylen = parseInt(this.configService.get<string>('HASH_KEYLEN'));
    this.digest = this.configService.get<string>('HASH_DIGEST');
  }

  async hashPassword(password: string): Promise<string> {
    const passwordSalt = await this.appConfigService.getSalt();
    return new Promise((resolve, reject) => {
      pbkdf2(
        password,
        passwordSalt,
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

  async comparePasswords({ storedHash, password }) {
    const passwordHash = await this.hashPassword(password);
    return passwordHash === storedHash;
  }
}
