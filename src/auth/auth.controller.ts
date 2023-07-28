import {
    Controller,
    Body,
    HttpCode,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @SkipThrottle()
    @Post('signup')
    signup(@Body() dto: AuthDto) {

        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        
        return this.authService.signin(dto);
    }
}
