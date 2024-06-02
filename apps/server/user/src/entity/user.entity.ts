import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@lib/access-control/roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'created_at', default: new Date() })
  createdAt: Date;

  @Column({ name: 'role', default: Role.User, enum: Role })
  role: number;
}
