import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ApplicationError } from '../error/error.application';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response
      .status(exception.httpStatus)
      .json({ message: exception.message, code: exception.code });
  }
}
