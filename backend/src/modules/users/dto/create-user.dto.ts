import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Length, IsNumber } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

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

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roleId: number;
}
