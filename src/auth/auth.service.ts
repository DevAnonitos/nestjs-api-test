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

            return this.signToken(user.id, user.email);
        } catch (error: any) {
            //Check Error if exists
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
        // Find user store in Db->by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // Check user is exist in db
        if(!user) {
            throw new ForbiddenException(
                'Credentials incorrect'
            );
        }
        
        const pwMatches = await bcrypt.compareSync(
            user.hashPass,
            dto.password,
        );

        if(pwMatches) {
            console.log('Password is correct!');
        } else {
            console.log('Password is correct!');
        }

        return this.signToken(user.id, user.email);
    }

    // Token
    async signToken(
            userId: string,
            email: string
        ): Promise<{ access_token: string }> {
        // Payload data from user
        const payload = {
            sub: userId,
            email,
        };

        // String Secret JWT
        const secret =  this.config.get("JWT_SECRET");

        // Create string token->encode data
        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret,
            },
        );

        // return token->store data user
        return {
            access_token: token,
        };
    }
}
