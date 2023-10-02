import { Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('')
@UseGuards(AuthGuard('jwt'))
export class JokeController {
    constructor(
        private userService: UserService,
    ) {}

    @Get('/random-joke')
    viewProfile( @GetUser() user: User ): Promise<any> {
        return this.userService.getJoke();
    }

}
