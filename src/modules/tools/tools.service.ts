import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class ToolsService {
    constructor(private mailerService: MailerService) {}
    async create(createEmailDto) {
        return createEmailDto;
    }
    /**
     * 发送邮件
     */
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
