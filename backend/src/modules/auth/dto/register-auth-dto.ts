import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login-auth.dto';

export class RegisterDto extends PartialType(LoginDto) {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    biography: string;

    @ApiProperty()
    @IsString()
    @MaxLength(20)
    @MinLength(5)
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    gender: string;

}
