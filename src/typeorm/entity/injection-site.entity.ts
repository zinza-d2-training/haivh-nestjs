import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ward } from './ward.entity';

@Entity()
export class InjectionSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  manager: string;

  @Column()
  number_table: number;

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

  @ManyToOne(() => Ward, (ward) => ward.injectionSites)
  ward: Ward;
}
