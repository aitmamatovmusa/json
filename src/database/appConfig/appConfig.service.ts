import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly appConfigRepository: Repository<Config>,
  ) {}

  async getSalt(): Promise<string> {
    const { value } = await this.appConfigRepository.findOne({
      where: { key: 'salt' },
    });
    return value;
  }
}
