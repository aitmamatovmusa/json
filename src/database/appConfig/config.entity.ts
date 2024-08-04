import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class Config extends BaseEntity {
  @Column()
  key: string;

  @Column()
  value: string;
}
