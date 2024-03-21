import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway {
    constructor(private readonly socketService: SocketService) {}

    @WebSocketServer()
    server: Server;

    /**
     * 测试 socket
     */
    @SubscribeMessage('newMessage')
    async count() {
        const res = await this.socketService.findCount();
        this.server.emit('newMessage', {
            msg: '后端返回的数据',
            data: res,
        });
    }

    /**
     * 统计数量
     */
    @SubscribeMessage('test')
    async test(@MessageBody() data) {
        this.server.emit('test', {
            msg: '前端传过来的数据',
            data: data,
        });
    }
}
