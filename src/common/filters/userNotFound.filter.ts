import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
}
