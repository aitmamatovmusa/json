import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAuthorIdException extends HttpException {
  constructor() {
    super(
      'The provided author ID is invalid or not found.',
      HttpStatus.NOT_FOUND,
    );
  }
}
