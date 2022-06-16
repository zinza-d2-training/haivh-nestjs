import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email can not be blank' })
  @IsEmail({ message: 'It must is email' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be blank' })
  password: string;
}
