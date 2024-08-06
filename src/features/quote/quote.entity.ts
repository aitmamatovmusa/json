import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Author } from '../author/author.entity';

@Entity('quote')
export class Quote extends BaseEntity {
  @Column()
  quote: string;

  @ManyToOne(() => Author, (author) => author.quotes)
  author: Author;
}
