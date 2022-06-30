import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, MaxLength, Min } from 'class-validator';

export class VaccineRegistrationDto {
  @IsNotEmpty()
  @Min(1)
  group_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @MaxLength(45)
  health_insurance: string;

  @IsNotEmpty()
  @MaxLength(45)
  occupation: string;

  @IsNotEmpty()
  @MaxLength(45)
  address: string;

  @IsNotEmpty()
  @MaxLength(45)
  work_place: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  expected_date: Date;

  @IsNotEmpty()
  @MaxLength(45)
  session: string;
}
