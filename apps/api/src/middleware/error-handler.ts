import { ErrorHandler } from 'hono';
import { AppEnv } from '../types';
import { AppError } from '../utils/errors';

export const errorHandlerMiddleware = (): ErrorHandler<AppEnv> => {
  return async (err, c) => {
    console.error('Unhandled API Error:', err);

    if (err instanceof AppError) {
      return c.json(
        {
          success: false,
          error: {
            code: err.code,
            message: err.message,
            details: err.details,
          },
        },
        err.status as any
      );
    }

    // Handle standard errors safely (don't leak stack traces)
    return c.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected operational error occurred. Please try again later.',
        },
      },
      500
    );
  };
};
