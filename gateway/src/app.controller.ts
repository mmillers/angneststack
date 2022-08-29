import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

export class AppController {

  protected clientProxy: ClientProxy;
  constructor() {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:iGin6pDCiFsY@44.202.131.229:5672/rmqinstancevr'],
        queue: 'stack'
      }
    });
  }
}
