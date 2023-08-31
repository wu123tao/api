import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { RoleModule } from './modules/role/role.module';
import { MinioModule } from './modules/minio/minio.module';
import { ConfigModule } from '@nestjs/config';
import { ToolsModule } from './modules/tools/tools.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    imports: [
        // .env配置文件
        ConfigModule.forRoot({ isGlobal: true }),
        // 数据库配置
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_URL,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_ACCOUNT,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATA_BASE,
            entities: [path.join(__dirname, '**', '*.entity.{js,ts}')],
            synchronize: true,
            // 输出sql语句
            // logging: true,
        }),
        // 邮件服务
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_AUTH,
                    pass: process.env.EMAIL_PASS,
                },
            },
            defaults: {
                from: `测试邮件<${process.env.EMAIL_AUTH}>`,
            },
            template: {
                dir: path.join(process.cwd(), 'src/modules/tools/template'),
                adapter: new EjsAdapter(),
            },
        }),
        UsersModule,
        RoleModule,
        MinioModule,
        ToolsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
