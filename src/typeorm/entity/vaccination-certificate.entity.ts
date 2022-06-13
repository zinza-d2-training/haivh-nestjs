import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Vaccine } from './vaccine.entity';

@Entity()
export class VaccineCertificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;

  @Column()
  time_injection: Date;

  @Column()
  address_injection: string;

  @Column()
  vaccine_number_lot: string;

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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccineCertificates)
  vaccine: Vaccine;
}
