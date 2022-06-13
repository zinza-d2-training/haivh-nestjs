import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';
import { InjectionSite } from './injection-site.entity';
import { User } from './user.entity';

@Entity()
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

  @ManyToOne(() => District, (district) => district.wards, {
    onDelete: 'SET NULL',
  })
  district: District;

  @OneToMany(() => User, (user) => user.ward)
  users: User[];

  @OneToMany(() => InjectionSite, (injectionSite) => injectionSite.ward)
  injectionSites: InjectionSite[];
}
