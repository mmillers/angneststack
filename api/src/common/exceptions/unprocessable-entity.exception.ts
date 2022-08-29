import { RpcException } from '@nestjs/microservices';

export class UnprocessableEntityException extends RpcException {
    constructor() {
        super('Houve um erro ao tentar inserir os dados');
    }
}
