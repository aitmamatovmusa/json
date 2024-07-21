import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
class Account extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullname: string;
}

export default Account;
