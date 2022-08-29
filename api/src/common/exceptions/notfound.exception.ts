import { RpcException } from '@nestjs/microservices';

export class NotFoundException extends RpcException {
    constructor() {
        super('Nenhum registro encontrado');
    }
}
