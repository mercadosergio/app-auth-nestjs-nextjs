import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login-auth.dto';

export class RegisterDto extends PartialType(LoginDto) {
    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;

    @ApiProperty()
    @IsString()
    confirmPassword: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
    @IsString()
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: 'El nombre de usuario solo puede contener letras, números y el carácter "_"',
    })
    username: string;

    @ApiProperty()
    @IsString()
    biography: string;

    @ApiProperty()
    @IsString()
    @Matches(/^[0-9]+$/, { message: 'El campo teléfono solo puede contener digitos' })
    @MaxLength(20, { message: 'El campo teléfono no debe tener más de 20 caracteres' })
    @MinLength(5, { message: 'El campo teléfono debe tener al menos 5 caracteres' })
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    gender: string;
}
