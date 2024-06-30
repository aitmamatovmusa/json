import { Controller, Get } from '@nestjs/common';

@Controller('info')
export class InfoController {
  @Get()
  getInfo() {
    return {
      success: true,
      data: { info: 'Some information about the <b>company</b>.' },
    };
  }
}
