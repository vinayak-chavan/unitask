import axios from 'axios';
import { Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from 'src/user/user.entity';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(registerDto: RegisterDto): Promise<any> {
        return this.userRepository.signUp(registerDto);
    }

    async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<any> {
      try{
        const username = await this.userRepository.validationPassword(AuthCredentialsDto);
        
        if(!username) 
          return { message: "Invalid credentials.", status: 400 };

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { message: "Login succesful.", status: 200, accessToken };
      } catch(error) {
        return { message: "Something went wrong.", status: 500 };
      }
    }

    async viewProfile(user: User): Promise<any> {
        if(user) {
          return { message: "User profile fetch successful.", status: 200, data: { username: user.username, email: user.email, mobile: user.mobile, city: user.city}  }
        }
        else {
          return {  message: "User not found.", status: 404 };
        }
    }

    async logout(user: User, @Req() req: Request, @Res() res: Response): Promise<any> {
      try{ 
        res.setHeader('Authorization', '');
        return {  message: "Logout successful.", status: 200 };
      } catch (error) {
        return { message: "Something went wrong.", status: 500 };
      }
    }

    async getJoke(): Promise<any> {
      try {
        const response: any = await axios.get('https://api.chucknorris.io/jokes/random');
        let data = await response.data.value;
        console.log(data);
        return {  message: "Joke fetched successful.", status: 200,  data: await response.data.value };
      } catch (error) {
        console.log(error)
        return { message: "Something went wrong.", status: 500 };
      }
    }

}
