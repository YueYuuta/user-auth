export interface LoggerRepository {
  log(context: string, message: string): void;
  warn(context: string, message: string): void;
  error(context: string, message: string, stack?: string): void;
}
