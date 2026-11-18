import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { ProblemDetails } from '@gofac/shared';

/**
 * Transforme toutes les erreurs au format commun "problem details" (RFC 9457).
 * Voir docs/technical/api-conventions.md, section « Erreurs ».
 */
@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status(code: number): { type(t: string): { json(body: unknown): void } };
    }>();
    const request = ctx.getRequest<{ originalUrl: string }>();

    const problem = toProblemDetails(exception, request.originalUrl);
    response.status(problem.status).type('application/problem+json').json(problem);
  }
}

export function toProblemDetails(exception: unknown, instance: string): ProblemDetails {
  if (exception instanceof HttpException) {
    const status = exception.getStatus();
    const body = exception.getResponse();
    const detail =
      typeof body === 'string'
        ? body
        : Array.isArray((body as { message?: unknown }).message)
          ? (body as { message: string[] }).message.join(' ; ')
          : String((body as { message?: unknown }).message ?? exception.message);
    return { type: 'about:blank', title: HttpStatus[status] ?? 'Error', status, detail, instance };
  }
  return {
    type: 'about:blank',
    title: 'INTERNAL_SERVER_ERROR',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    detail: 'Une erreur inattendue est survenue.',
    instance,
  };
}
