import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SanitizeResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => sanitize(data)));
  }
}

function sanitize(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map((item: unknown): unknown =>
      isRecord(item) ? sanitizeObject(item) : item,
    );
  }
  if (isRecord(data)) {
    return sanitizeObject(data);
  }
  return data;
}

function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
  const clone = { ...obj };
  delete clone.password;
  delete clone.salt;
  delete clone.hash;
  return clone;
}

function isRecord(data: unknown): data is Record<string, unknown> {
  return typeof data === 'object' && data !== null && !Array.isArray(data);
}
