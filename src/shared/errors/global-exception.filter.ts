import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { createAPIError, ErrorDefinition } from './error.codes.js';
import { APIError } from 'better-auth/api';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ErrorDefinition) {
      const apiError = createAPIError(exception);
      return response.status(apiError.statusCode).json({
        message: apiError.message,
        statusCode: apiError.statusCode,
        error: apiError.name,
      });
    }

    if (exception instanceof APIError) {
      return response.status(exception.statusCode).json({
        message: exception.message,
        statusCode: exception.statusCode,
        error: exception.name,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json(exception.getResponse());
    }

    console.error('Unhandled Exception:', exception);

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
