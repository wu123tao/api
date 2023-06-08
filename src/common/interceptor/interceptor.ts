import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class transformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ data, code: 200, message: '操作成功' })));
  }
}
