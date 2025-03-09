import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationExceptionFilter } from './modules/shared/filters/application-exception.filter';
import { DomainExceptionFilter } from './modules/shared/filters/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ApplicationExceptionFilter(),
    new DomainExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
