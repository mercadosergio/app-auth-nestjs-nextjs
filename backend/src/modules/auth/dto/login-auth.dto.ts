import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail({}, { message: 'El formato del email no es válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(50, { message: 'La contraseña no puede superar los 50 catacteres' })
    password: string;
}
