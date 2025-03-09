import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationExceptionFilter } from './modules/shared/filters/application-exception.filter';
import { DomainExceptionFilter } from './modules/shared/filters/domain-exception.filter';
import { ThrottlerExceptionFilter } from './modules/shared/filters/throttler-exception.filter';
import { DatabaseExceptionFilter } from './modules/shared/filters/database-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ApplicationExceptionFilter(),
    new DomainExceptionFilter(),
    new ThrottlerExceptionFilter(),
    new DatabaseExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentación de la API')
    .setDescription('API para manejar autenticación, usuarios, etc.')
    .setVersion('1.0')
    .addBearerAuth() // Añade soporte para autenticación JWT (opcional)
    .build();

  // Generar documento Swagger y exponerlo en /api
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(3000);
}
bootstrap();
