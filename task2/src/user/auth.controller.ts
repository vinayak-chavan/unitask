import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('users')
export class AuthController {
    constructor(
        private userService: UserService,
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) registerDto: RegisterDto): Promise<any> {
        return this.userService.signUp(registerDto);
    }

    @Post('/login')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
        return this.userService.signIn(authCredentialsDto);
    }
}
