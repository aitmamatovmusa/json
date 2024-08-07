import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Author extends BaseEntity {
  @Column()
  fullname: string;
}
