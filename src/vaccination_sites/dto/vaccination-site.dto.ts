import { IsNotEmpty, MaxLength, Min } from 'class-validator';

export class VaccinationSiteDto {
  @IsNotEmpty()
  @MaxLength(45)
  name: string;

  @IsNotEmpty()
  @MaxLength(45)
  address: string;

  @IsNotEmpty()
  @MaxLength(45)
  manager: string;

  @IsNotEmpty()
  @Min(1)
  number_table: number;

  @IsNotEmpty()
  @Min(1)
  ward_id: number;
}
