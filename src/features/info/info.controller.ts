import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/auth.decorator';

@Controller('info')
export class InfoController {
  @Get()
  @Public()
  getInfo() {
    return { info: 'Some information about the company.' };
  }
}
