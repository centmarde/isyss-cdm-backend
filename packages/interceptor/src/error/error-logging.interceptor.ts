import { IAuthenticatedRequest } from '@isyss-cdm/interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { formatISO } from 'date-fns';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();

    return next.handle().pipe(
      catchError((err: unknown) => {
        const errorObj = err as {
          response?: { message?: string };
          message?: string;
          stack?: string;
        };

        const errorPayload = {
          method: request.method,
          url: request.originalUrl,
          timestamp: formatISO(new Date()),
          userId: request.user?.id || 'unauthenticated',
          error:
            errorObj?.response?.message ||
            errorObj?.message ||
            'Unhandled Exception',
          stack: errorObj?.stack,
        };

        this.logger.error(
          `HTTP ${errorPayload.method} ${errorPayload.url} - ${errorPayload.error}`,
          JSON.stringify(errorPayload),
        );

        throw err;
      }),
    );
  }
}
