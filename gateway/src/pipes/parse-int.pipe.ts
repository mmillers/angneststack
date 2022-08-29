import { Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ParseIntPipe implements PipeTransform<any, number> {
    transform(value: any): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new RpcException('O código deve ser um número');
        }
        return val;
    }
}
