import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { DomainError } from '../error/error.domain';
import { WeakPasswordError } from 'src/modules/auth/domain/error/weak-password.error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Asignar un código HTTP basado en el tipo de error de dominio
    let httpStatus: number;
    switch (exception.constructor) {
      case WeakPasswordError:
        httpStatus = HttpStatus.BAD_REQUEST; // Contraseña débil: 400 Bad Request
        break;
      default:
        httpStatus = HttpStatus.BAD_REQUEST; // Por defecto: 400 Bad Request
    }

    // Responder al cliente con un JSON claro
    response.status(httpStatus).json({
      message: exception.message,
      errorType: exception.name, // Tipo de error para mayor claridad
    });
  }
}
