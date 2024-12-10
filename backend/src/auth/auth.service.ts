import {
    ForbiddenException, Inject, Injectable,
    InternalServerErrorException, NotFoundException, UnauthorizedException
} from "@nestjs/common";
import { ConfirmLoginProperties } from "./auth.types";
import { Repository } from "typeorm";
import { User } from "src/typeorm/user/user.entity";
import { SHA512 } from 'crypto-js';
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class AuthService {

    constructor(
        @Inject(`USER`) private readonly user: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    private isPasswordHashEqual = (password: string, hash: string): boolean => {


        if (SHA512(password).toString() !== hash) {
            return false;
        }

        return true;
    }

    public confirmLogin = async (props: ConfirmLoginProperties): Promise<string> => {

        let user: User;

        user = await this.user.findOne({ where: { login: props.login } });

        if (!user) {
            throw new NotFoundException(`User with login: ${props.login} doesn't exist.`);
        }

        if (!user.isActive) {
            throw new ForbiddenException(`User has been deactivated.`);
        }

        if (!this.isPasswordHashEqual(props.password, user.password)) {
            throw new UnauthorizedException(`Incorrect credentials.`);
        }

        try {

            const payload = { login: user.login, id: user.id };
            return await this.jwtService.signAsync(payload);

        } catch (err) {
            throw new InternalServerErrorException(`Failed to sign token.`);
        }
    }

}