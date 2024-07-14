import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(@Req() req, @Res() res) {
    this.authService.login();
    res.send(req.session?.id);
  }

  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }
}
