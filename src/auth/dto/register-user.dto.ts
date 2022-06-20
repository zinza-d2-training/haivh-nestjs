import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

enum GenderType {
  MALE = 'nam',
  FEMALE = 'nữ',
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Identity Card can not be blank' })
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

  @IsNotEmpty({ message: 'DoB can not be blank' })
  @IsISO8601()
  dob: Date;

  @IsNotEmpty({ message: 'Gender can not be blank' })
  @IsEnum(GenderType)
  gender: string;

  @IsNotEmpty({ message: 'Ward Id can not be blank' })
  @IsNumber()
  @Min(1)
  ward_id: number;
}
