import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as dayjs from 'dayjs';

@Injectable()
export class NoticeServiceService {
    constructor(private mailerService: MailerService) {}
    getHello(): string {
        return 'Hello World!';
    }

    async sendEmail() {
        const code = Math.random().toString().slice(-6);
        const date = dayjs().format('YYYY年MM月DD日 HH:mm:ss');

        await this.mailerService.sendMail({
            to: 'wutao970326@163.com',
            subject: '系统邮件',
            template: './validate.code.ejs',
            context: {
                code,
                date,
                sign: '系统邮件，回复无效。',
            },
        });
        return '发送成功';
    }
}
