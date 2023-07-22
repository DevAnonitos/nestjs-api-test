import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        // HashPassword Func
        const roundSalt = 14;
        const salt = await bcrypt.genSalt(roundSalt);
        const hassPassword = await bcrypt.hash(dto.password, salt);

        
        return {
            msg: 'I have signup'
        }
    }

    async signin(dto: AuthDto) {
        return {
            msg: 'I have signin'
        }
    }
}
