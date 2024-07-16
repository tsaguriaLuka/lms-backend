import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../database-postgres/entities/default.entity';

@Entity('users')
export class UserEntity extends DefaultEntity {
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl: string;
}
