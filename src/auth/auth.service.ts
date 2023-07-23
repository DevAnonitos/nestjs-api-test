import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    // Func signUp->logic handle
    async signup(dto: AuthDto) {
        // HashPassword Func
        const roundSalt = 14;
        const salt = await bcrypt.genSalt(roundSalt);
        const hashPassword = await bcrypt.hash(dto.password, salt);

        try {
            // Verify token
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hashPass: hashPassword,
                },
            });

            return user;
        } catch (error: any) {
            // Error if exists
            if (error.code === 'P2002') {
                throw new ForbiddenException(
                    'Credentials taken',
                );
            }

            console.log(error.message);
            throw error;
        }
    }

    // Func signIn->logic handle
    async signin(dto: AuthDto) {
        return {
            msg: 'I have signin'
        }
    }
}
