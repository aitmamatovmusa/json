import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login() {
    return this.authService.login();
  }

  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }
}
