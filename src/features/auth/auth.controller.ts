import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(@Req() req, @Res() res): void {
    this.authService.login();
    res.send(req.session?.id);
  }

  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }
}
