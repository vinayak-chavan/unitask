import { IsString, MaxLength, MinLength, IsEmail } from "class-validator";

export class RegisterDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4, {message: 'minimum 4 character required'})
    @MaxLength(20, {message: 'minimum 20 character required'})
    password: string;

    @IsString()
    mobile: string;

    @IsString()
    city: string;
}