import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { delayResponse } from 'src/common/utils/delay';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async getRandomAuthor() {
    const count = await this.authorRepository.count();
    if (count === 0) {
      return null;
    }

    const randomOffset = Math.floor(Math.random() * count);
    const { fullname, id } = await this.authorRepository
      .createQueryBuilder('author')
      .skip(randomOffset)
      .take(1)
      .getOne();

    return await delayResponse({ authorId: id, name: fullname });
  }
}
