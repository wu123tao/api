import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.message;
        // console.log('错误提示', message, request);

        response.status(status).json({
            code: status,
            message: message,
            data: null,
        });
        // 设置返回的状态码、请求头、发送错误信息
        // response.status(status);
        // response.header('Content-Type', 'application/json; charset=utf-8');
        // response.send(errorResponse);
    }
}
