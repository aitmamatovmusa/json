import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { pbkdf2, randomBytes } from 'crypto';

@Injectable()
export class PasswordService {
  private saltLength: number;
  private iterations: number;
  private keylen: number;
  private digest: string;

  constructor(private configService: ConfigService) {
    this.saltLength = parseInt(this.configService.get<string>('SALT_LENGTH'));
    this.iterations = parseInt(
      this.configService.get<string>('HASH_ITERATIONS'),
    );
    this.keylen = parseInt(this.configService.get<string>('HASH_KEYLEN'));
    this.digest = this.configService.get<string>('HASH_DIGEST');
  }

  async hashPassword(
    password: string,
    salt?: string | undefined,
  ): Promise<string> {
    const passwordSalt = salt ?? this.generateSalt();
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

  generateSalt(): string {
    return randomBytes(this.saltLength).toString('hex');
  }
}
