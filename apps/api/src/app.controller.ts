import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('NOTICE_SERVICE')
        private NoticeService: ClientProxy,
    ) {}

    @Get()
    getHello(): any {
        this.NoticeService.emit('email', null);

        return this.appService.getHello();
    }
}
