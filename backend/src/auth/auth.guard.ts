import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/typeorm/user/user.entity";
import { Repository } from "typeorm";

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(
        @Inject(`USER`) private readonly user: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        let user: User = null;
        const request = context.switchToHttp().getRequest();
        const token = request.cookies.jwt;

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });

            if (!payload) {
                throw new UnauthorizedException(`Invalid token.`);
            }

            if (Date.now() > (payload.exp * 1000)) {
                throw new UnauthorizedException(`Invalid token.`);
            }

            user = await this.user.findOneBy({ id: payload.id });

        } catch (err) {
            console.error(`Failed to authorize user. Error: ${err.message}. Date: ${new Date().toLocaleString(`pl-PL`)}`);
            throw new UnauthorizedException();
        }
        
        return true;
    }
}