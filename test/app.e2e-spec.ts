// import Module Testing
import {
    ValidationPipe,
    INestApplication
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as pactum from "pactum";

// Import Module app config
import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto";

// ServiceApi
import { PrismaService } from "../src/prisma/prisma.service";

describe('App e2e', () => {
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    });

    it.todo('should pass');
})
