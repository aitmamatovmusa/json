import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingAuthorIdException extends HttpException {
  constructor() {
    super('Author ID is required but was not provided', HttpStatus.BAD_REQUEST);
  }
}
