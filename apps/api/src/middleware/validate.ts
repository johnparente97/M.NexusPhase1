import { z } from 'zod';
import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';
import { ValidationError } from '../utils/errors';

type ValidationTarget = 'json' | 'query' | 'param';

export function zValidator(
  target: ValidationTarget,
  schema: z.ZodSchema
): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    let value: unknown;

    try {
      if (target === 'json') {
        value = await c.req.json();
      } else if (target === 'query') {
        value = c.req.query();
      } else if (target === 'param') {
        value = c.req.param();
      }

      const parsed = await schema.safeParseAsync(value);

      if (!parsed.success) {
        // Format Zod errors cleanly
        const fieldErrors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const path = issue.path.join('.');
          fieldErrors[path] = issue.message;
        }

        throw new ValidationError('Validation failed for input fields.', fieldErrors);
      }

      // Store validated data in request context using a specific key if needed
      c.req.addValidatedData(target, parsed.data);
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      if (error instanceof SyntaxError) {
        throw new ValidationError('Malformed JSON payload received.');
      }
      throw new ValidationError('Invalid request arguments.');
    }

    return next();
  };
}
