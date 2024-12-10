import { Request } from 'express';

export type ConfirmLoginProperties = {
    password: string;
    login: string;
    req: Request
}