import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPasswordException extends HttpException {
  constructor() {
    super('Wrong password', HttpStatus.UNAUTHORIZED);
  }
}
