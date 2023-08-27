import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
@Module({
    imports: [
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            socket: {
                host: '124.222.52.234',
                port: 6379,
            },
            password: 'root',
            ttl: 0,
        }),
    ],
    controllers: [MinioController],
    providers: [MinioService],
})
export class MinioModule {}
