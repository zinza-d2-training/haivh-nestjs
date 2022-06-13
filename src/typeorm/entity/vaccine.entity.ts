import { VaccineCertificate } from './vaccination-certificate.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vaccine {
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

  @OneToMany(
    () => VaccineCertificate,
    (vaccineCertificate) => vaccineCertificate.vaccine,
  )
  vaccineCertificates: VaccineCertificate[];
}
