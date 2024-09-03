import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {

  @ApiProperty({
    description: 'Email address of the user',
    example: 'fran@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '1234567',
  })
  @IsString()
  password: string;
}


