export interface ILogger {
  log(context: string, message: string): void;
  warn(context: string, message: string): void;
  error(context: string, message: string, stack?: string): void;
}
