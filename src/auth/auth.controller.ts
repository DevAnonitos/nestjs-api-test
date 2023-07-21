import {
    Controller,
    Body,
    HttpCode,
    HttpStatus,
    Post,
    Req
} from '@nestjs/common';
import { Request } from "express";
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Req() req: Request) {
        console.log(req.body);
        return this.authService.signup();
    }

    @Post('signin')
    signin(@Req() req: Request) {
        console.log(req);
        return this.authService.signin();
    }
}
