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
    @MinLength(8)
    @MaxLength(100)
    password: string;
}
