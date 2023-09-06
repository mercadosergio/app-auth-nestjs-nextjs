import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API REST DE USUARIOS')
    .setDescription('Funciones de control de usuarios y roles')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Users')
    .addTag('Auth')
    .addTag('Roles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(8000);
}
bootstrap();
