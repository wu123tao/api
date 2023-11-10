import { Global, Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';

@Global()
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
        TypeOrmModule.forFeature([FileEntity]),
    ],
    controllers: [ToolsController],
    providers: [ToolsService],
    exports: [ToolsService],
})
export class ToolsModule {}
