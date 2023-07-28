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
import passport from "passport";

describe('App e2e', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication()
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        // Init testing host in port 3333
        await app.init();
        await app.listen(4444);

        // Import Prisma Db test service
        prisma = app.get(PrismaService);
        await prisma.cleanDb();

        // Add pactum libs
        pactum.request.setBaseUrl(
            'http://localhost:3333'
        )
    });

    // Close app test
    afterAll(() => {{
        app.close();
    }});

    describe('Auth', () => {
        const dto: AuthDto = {
            email: "vlad2@gmail.com",
            password: 'No2de@241241.11'
        }
        // Test SignUp
        describe('Signup', () => {
            it('should throw if email empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        password: dto.password,
                    })
                    .expectStatus(400)
            })
            it('Should throw if password empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({
                        email: dto.email,
                    })
                    .expectStatus(400);
            });
            it('should throw if no body provided', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .expectStatus(400);
            });
            it('should signup', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201);
            });
        });
    });


    it.todo('should pass');
    it.todo('should pass 2');
})
