import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //SwaggerModule
  const options = new DocumentBuilder()
    .setTitle("ApiTest")
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  // Config document
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api', app, document);
  // Config PipLine
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // Add Cors app
  app.enableCors();
  await app.listen(3333);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
