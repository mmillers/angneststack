import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

const logger = new Logger('Main');
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://user:iGin6pDCiFsY@44.202.131.229:5672/rmqinstancevr'],
            noAck: false,
            queue: 'stack'
        }
    });

    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.listen().then(() => logger.log('Microservice listening'));
}
bootstrap();
