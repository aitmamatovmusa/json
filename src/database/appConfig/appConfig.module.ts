import { Module } from '@nestjs/common';
import { AppConfigService } from './appConfig.service';
import { AppConfig } from './appConfig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AppConfig])],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
