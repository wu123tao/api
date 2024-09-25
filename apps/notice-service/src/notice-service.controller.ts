import { Controller, Get } from '@nestjs/common';
import { NoticeServiceService } from './notice-service.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class NoticeServiceController {
    constructor(private readonly nestServiceService: NoticeServiceService) {}

    @EventPattern('sum')
    sum(numArr: Array<number>) {
        console.log(numArr, '微服务=demo');
    }

    /**
     * 发送邮件
     */
    @EventPattern('email')
    async sendEmail() {
        await this.nestServiceService.sendEmail();
    }
}
