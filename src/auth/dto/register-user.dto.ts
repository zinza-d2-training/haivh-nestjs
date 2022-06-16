import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Identity Card can not be blank' })
  identity_card: string;

  @IsNotEmpty({ message: 'Email can not be blank' })
  @IsEmail({ message: 'It must is email' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be blank' })
  password: string;

  @IsNotEmpty({ message: 'Username can not be blank' })
  name: string;

  @IsNotEmpty({ message: 'DoB can not be blank' })
  dob: Date;

  @IsNotEmpty({ message: 'Gender can not be blank' })
  gender: string;

  @IsNotEmpty({ message: 'Ward Id can not be blank' })
  ward_id: number;
}
