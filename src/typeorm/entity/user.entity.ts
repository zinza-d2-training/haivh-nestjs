import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ward } from './ward.entity';
import { Role } from './role.entity';
import { VaccineRegistration } from './vaccine-registration.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dob: Date;

  @Column()
  gender: string;

  @Column()
  identity_card: string;

  @Column()
  password: string;

  @Column({
    type: 'timestamp',
  })
  create_at: Date;

  @Column({
    type: 'timestamp',
  })
  update_at: Date;

  @Column({
    type: 'timestamp',
  })
  delete_at: Date;

  @ManyToOne(() => Ward, (ward) => ward.users, {
    onDelete: 'SET NULL',
  })
  ward: Ward;

  @ManyToOne(() => Role, (ward) => ward.users, {
    onDelete: 'SET NULL',
  })
  role: Role;

  @OneToMany(
    () => VaccineRegistration,
    (vaccineRegistration) => vaccineRegistration.user,
  )
  vaccineRegistrations: VaccineRegistration[];
}
