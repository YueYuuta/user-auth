export class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly httpStatus: number, // Código HTTP
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}
