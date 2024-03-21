import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/modules/tools/entities/file.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FileEntity])],
    providers: [SocketGateway, SocketService],
    exports: [SocketGateway],
})
export class SocketModule {}
