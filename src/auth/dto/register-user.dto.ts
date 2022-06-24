import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CheckLength } from './check-length.dto';

enum GenderType {
  MALE = 'nam',
  FEMALE = 'nữ',
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Identity Card can not be blank' })
  @CheckLength({ message: 'Identity Card Number must equal 9 or equal 12' })
  identity_card: string;

  @IsNotEmpty({ message: 'Email can not be blank' })
  @IsEmail({ message: 'It must is email' })
  @MaxLength(45)
  email: string;

  @IsNotEmpty({ message: 'Password can not be blank' })
  @MinLength(8)
  @MaxLength(10)
  password: string;

  @IsNotEmpty({ message: 'Username can not be blank' })
  @MaxLength(45)
  name: string;

  @Type(() => Date)
  @IsDate({ message: 'dob must be of type mm/dd/yyyy' })
  @IsNotEmpty({ message: 'Birthday cannot be left blank' })
  dob: Date;

  @IsNotEmpty({ message: 'Gender can not be blank' })
  @IsEnum(GenderType)
  gender: string;

  @IsNotEmpty({ message: 'Ward Id can not be blank' })
  @IsNumber()
  @Min(1)
  ward_id: number;
}
