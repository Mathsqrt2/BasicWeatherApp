import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { providers } from "src/app.providers";

@Module({
    imports: [],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        ...providers
    ],
})

export class AuthModule { }