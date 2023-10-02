import { Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Request, Response } from 'express';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get('/me')
    viewProfile( @GetUser() user: User ): Promise<any> {
        return this.userService.viewProfile(user);
    }

    @Post('/logout')
    logout(@GetUser() user: User, @Req() req: Request, @Res() res: Response ): Promise<void> {
        return this.userService.logout(user, req, res);
    }

}
