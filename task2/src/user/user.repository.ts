import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(registerDto: RegisterDto): Promise<any> {
        try{
            const { username, password, email, mobile, city } = registerDto;

            const user = new User();
            user.username = username;
            user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(password, user.salt);
            user.email = email;
            user.mobile = mobile;
            user.city = city;

            await user.save();
            return { message: "Sign up successful.", status: 201 }
        } catch (error) {
            if(error.code === '23505') {
                return { message: "Username already exists.", status: 400 }
            } else {
                return { message: "Something went wrong.", status: 500 }
            }
        }
    }

    async validationPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user= await this.findOne({ username });

        if(user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}