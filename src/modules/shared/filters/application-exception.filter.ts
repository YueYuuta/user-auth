import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { ApplicationError } from '../error/error.application';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApplicationExceptionFilter.name);
  catch(exception: ApplicationError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    this.logger.error(
      `ApplicationError: ${exception.message}`,
      exception.stack,
    );
    response
      .status(exception.httpStatus)
      .json({ message: exception.message, code: exception.code });
  }
}
