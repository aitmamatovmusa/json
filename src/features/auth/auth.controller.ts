import { Body, Controller, Post, Session } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Session as SessionType } from 'express-session';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto, @Session() session: SessionType) {
    return this.authService.login(loginData, session);
  }

  @Post('register')
  register(@Body() registerData: RegisterDto, @Session() session: SessionType) {
    return this.authService.register(registerData, session);
  }
}
