import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../application/driver-port/ILogger';

@Injectable()
export class NestLoggerService implements ILogger {
  private readonly logger = new Logger();

  log(context: string, message: string): void {
    this.logger.log(`[${context}] ${message}`);
  }

  warn(context: string, message: string): void {
    this.logger.warn(`[${context}] ${message}`);
  }

  error(context: string, message: string, stack?: string): void {
    this.logger.error(`[${context}] ${message}`, stack);
  }
}
