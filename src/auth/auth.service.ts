import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {}

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
