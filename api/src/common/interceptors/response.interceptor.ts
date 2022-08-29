import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { finalize, Observable } from "rxjs";

export class ResponseInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const rmqContext = context.switchToRpc().getContext();
        const channel = rmqContext.getChannelRef();
        const originalMessage = rmqContext.getMessage();
        return next
            .handle()
            .pipe(
                finalize(() => channel.ack(originalMessage))
            );
    }
}
