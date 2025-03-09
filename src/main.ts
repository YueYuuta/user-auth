import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationExceptionFilter } from './modules/shared/filters/application-exception.filter';
import { DomainExceptionFilter } from './modules/shared/filters/domain-exception.filter';
import { ThrottlerExceptionFilter } from './modules/shared/filters/throttler-exception.filter';
import { DatabaseExceptionFilter } from './modules/shared/filters/database-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ApplicationExceptionFilter(),
    new DomainExceptionFilter(),
    new ThrottlerExceptionFilter(),
    new DatabaseExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
