import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
    async signup() {
        return {
            msg: 'I have signup'
        }
    }
    async signin() {
        return {
            msg: 'I have signin'
        }
    }
}
