import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfig } from './appConfig.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppConfigService {
  constructor(
    @InjectRepository(AppConfig)
    private readonly appConfigRepository: Repository<AppConfig>,
  ) {}

  async getSalt(): Promise<string> {
    const { value } = await this.appConfigRepository.findOne({
      where: { key: 'salt' },
    });
    return value;
  }
}
