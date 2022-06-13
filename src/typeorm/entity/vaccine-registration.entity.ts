import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
export class VaccineRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  health_insurance: string;

  @Column()
  occupation: string;

  @Column()
  work_place: string;

  @Column()
  address: string;

  @Column()
  date: Date;

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

  @ManyToOne(() => Group, (group) => group.vaccineRegistrations)
  group: Group;

  @ManyToOne(() => User, (user) => user.vaccineRegistrations)
  user: User;
}
