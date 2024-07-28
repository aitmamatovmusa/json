import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAuthorInfo() {
    return await this.authorService.getAuthor();
  }
}
