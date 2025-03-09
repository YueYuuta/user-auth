import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ThrottlerExceptionFilter.name);
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    this.logger.error(`ThrottlerError: ${exception.message}`, exception.stack);
    response.status(429).json({
      statusCode: 429,
      message: 'Too many requests, please try again later.',
    });
  }
}
