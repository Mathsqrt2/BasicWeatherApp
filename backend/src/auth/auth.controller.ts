import {
    BadRequestException, Body, Controller,
    HttpStatus, Post, Req, Res
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./DTOs/login.dto";
import { Request, Response } from 'express';

@Controller('api')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    async loginUser(
        @Body() body: LoginDTO,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {

        if (!body.login || !body.password) {
            throw new BadRequestException();
        }

        try {

            const accessToken = await this.authService.confirmLogin({ ...body, req });
            res.cookie('jwt', accessToken, { httpOnly: true });
            res.status(HttpStatus.OK).json(accessToken);

        } catch (err) {
            console.error(`Failed to login user. Error: ${err.message}. ${new Date().toLocaleDateString(`pl-PL`)}`);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}