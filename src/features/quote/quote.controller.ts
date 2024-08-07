import { Controller, Get, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';

interface QueryParams {
  authorId: string | undefined;
}

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  async getRandomQuoteFromAuthor(@Query() { authorId }: QueryParams) {
    return await this.quoteService.getRandomQuoteFromAuthor(authorId);
  }
}
