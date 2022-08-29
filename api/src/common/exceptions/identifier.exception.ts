import { RpcException } from '@nestjs/microservices';

export class IdentifierException extends RpcException {
    constructor() {
        super('Identificador deve ser um número');
    }
}
