import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Session as SessionType } from 'express-session';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(
    @Body() loginData,
    @Session() session: SessionType,
  ): Promise<string> {
    console.log(session?.id);
    // this.authService.login();
    return;
  }

  @Post('register')
  register(@Body() registerData: RegisterDto, @Session() session: SessionType) {
    return this.authService.register(registerData, session);
  }
}
