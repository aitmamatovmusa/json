import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('quote')
export class Quote extends BaseEntity {
  @Column()
  quote: string;
}
