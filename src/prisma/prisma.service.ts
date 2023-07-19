import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor () {
        super({
            datasources: {
                db: {
                    
                }
            }
        })
    }
}
