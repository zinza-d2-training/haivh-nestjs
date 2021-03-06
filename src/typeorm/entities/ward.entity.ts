import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';
import { User } from './user.entity';
import { VaccinationSite } from './vaccination_sites.entity';

@Entity('wards')
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @Column()
  district_id: number;

  @ManyToOne(() => District, (district) => district.wards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => User, (user) => user.ward)
  users: User[];

  @OneToMany(() => VaccinationSite, (vaccineSite) => vaccineSite.ward)
  vaccination_sites: VaccinationSite[];
}
