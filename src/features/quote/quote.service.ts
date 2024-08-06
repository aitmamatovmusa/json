import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MissingAuthorIdException } from 'src/common/filters/missingAuthorIdException.filter';
import { Quote } from './quote.entity';
import { Repository } from 'typeorm';
import { InvalidAuthorIdException } from 'src/common/filters/invalidAuthorId.filter';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  async getRandomQuoteFromAuthor(authorId: string | undefined) {
    if (!authorId) {
      throw new MissingAuthorIdException();
    }

    try {
      const { quote, id: quoteId } = await this.quoteRepository
        .createQueryBuilder('quote')
        .where('quote.authorId = :authorId', { authorId })
        .orderBy('RANDOM()')
        .limit(1)
        .getOne();
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ authorId, quoteId, quote });
        }, 0);
      });
    } catch {
      throw new InvalidAuthorIdException();
    }
  }
}
