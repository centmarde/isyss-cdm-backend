import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseSuccessDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (
          context.switchToHttp().getResponse().statusCode >= 200 &&
          context.switchToHttp().getResponse().statusCode < 300
        ) {
          return {
            ...data,
            message: 'Ok',
            code: '000000',
            statusCode: context.switchToHttp().getResponse().statusCode,
          };
        }
        return data;
      }),
    );
  }
}
