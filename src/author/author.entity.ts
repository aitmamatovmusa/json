import { Column, Entity } from 'typeorm';

@Entity()
export class Author {
  @Column()
  fullname: string;
}
