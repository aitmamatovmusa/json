import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';

@Module({
  imports: [],
  controllers: [InfoController],
  providers: [],
  exports: [],
})
export class InfoModule {}
