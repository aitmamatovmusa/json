import { Module } from '@nestjs/common';
import { AppConfigService } from './appConfig.service';
import { Config } from './config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Config])],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
