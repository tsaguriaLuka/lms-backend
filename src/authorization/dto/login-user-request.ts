import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password mus be at least 6 charters long' })
  password: string;
}
