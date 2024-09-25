import { NestFactory } from '@nestjs/core';
import { NoticeServiceModule } from './notice-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        NoticeServiceModule,
        {
            transport: Transport.TCP,
            options: {
                port: 4000,
            },
        },
    );
    await app.listen();
}
bootstrap();
