import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
