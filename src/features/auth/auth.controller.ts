import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Session as SessionType } from 'express-session';
import { LoginResponse } from './types';
import { Public } from './auth.decorator';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthContoller {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(
    @Body() loginData: LoginDto,
    @Session() session: SessionType,
  ): Promise<LoginResponse> {
    return this.authService.login(loginData, session);
  }

  @Post('register')
  @Public()
  register(
    @Body() registerData: RegisterDto,
    @Session() session: SessionType,
  ): Promise<void> {
    return this.authService.register(registerData, session);
  }

  @Delete('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.logout(request, response);
  }
}
