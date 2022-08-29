import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.BAD_REQUEST;
        const message: any = exception instanceof HttpException ? exception.getResponse() : exception.message;

        response.status(status).json({
            error: message
        });
    }
}
