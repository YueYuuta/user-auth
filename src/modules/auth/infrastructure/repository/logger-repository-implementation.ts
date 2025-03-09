import { Injectable, Logger } from '@nestjs/common';
import { LoggerRepository } from '../../application/driver-port/logger.repository';

@Injectable()
export class LoggerRepositoryImplementation implements LoggerRepository {
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
