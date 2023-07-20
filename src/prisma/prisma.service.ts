import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor (config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('mongodb+srv://testapi:1412@cluster0.ecqseqk.mongodb.net/test')
                }
            }
        });
    }

    cleanDb() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany(),
        ]);
    }
}
