import { Module } from '@nestjs/common';
import { NoticeServiceController } from './notice-service.controller';
import { NoticeServiceService } from './notice-service.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    imports: [
        // 邮件服务
        MailerModule.forRoot({
            transport: {
                host: 'smtp.qq.com',
                port: 465,
                auth: {
                    user: 'q.1041154165@qq.com',
                    pass: 'aizkxvcmkrpnbeej',
                },
            },
            defaults: {
                from: `测试邮件<q.1041154165@qq.com>`,
            },
            template: {
                dir: path.join(
                    process.cwd(),
                    'apps/notice-service/src/template',
                ),
                adapter: new EjsAdapter(),
            },
        }),
    ],
    controllers: [NoticeServiceController],
    providers: [NoticeServiceService],
    exports: [NoticeServiceService],
})
export class NoticeServiceModule {}
