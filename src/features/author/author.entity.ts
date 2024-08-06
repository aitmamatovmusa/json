import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Quote } from '../quote/quote.entity';

@Entity()
export class Author extends BaseEntity {
  @Column()
  fullname: string;

  @OneToMany(() => Quote, (quote) => quote.author)
  quotes: Quote[];
}
