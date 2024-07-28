import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Session as SessionType } from 'express-session';
import { LoginResponse } from './types';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() loginData: LoginDto,
    @Session() session: SessionType,
  ): Promise<LoginResponse> {
    return this.authService.login(loginData, session);
  }

  @Post('register')
  register(
    @Body() registerData: RegisterDto,
    @Session() session: SessionType,
  ): Promise<void> {
    return this.authService.register(registerData, session);
  }
}
