import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Config PipLine
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // Add Cors app
  app.enableCors();
  await app.listen(3333);
}
bootstrap();
