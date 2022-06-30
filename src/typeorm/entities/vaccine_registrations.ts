import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity('vaccine_registrations')
export class VaccineRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group_id: number;

  @Column()
  user_id: number;

  @Column()
  health_insurance: string;

  @Column()
  occupation: string;

  @Column()
  work_place: string;

  @Column()
  address: string;

  @Column()
  expected_date: Date;

  @Column()
  session: string;

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

  @ManyToOne(() => Group, (group) => group.vaccine_registrations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => User, (group) => group.vaccine_registrations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Group;
}
