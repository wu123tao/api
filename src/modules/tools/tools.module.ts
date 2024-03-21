import { Global, Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { ConfigService } from '@nestjs/config';
import { envConfigVo } from 'src/config/config.interface';
import { SocketModule } from 'src/modules/socket/socket.module';

@Global()
@Module({
    imports: [
        // 注册redis服务
        CacheModule.registerAsync({
            useFactory: (config: ConfigService<envConfigVo>) => ({
                store: redisStore,
                ...config.get('redisConfig'),
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([FileEntity]),
        SocketModule,
    ],
    controllers: [ToolsController],
    providers: [ToolsService],
    exports: [ToolsService],
})
export class ToolsModule {}
