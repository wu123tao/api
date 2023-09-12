import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { RoleModule } from './modules/role/role.module';
import { MinioModule } from './modules/minio/minio.module';
import { ToolsModule } from './modules/tools/tools.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';
import { VmpConfigModule } from './config/config.module';
import { EmailConfig, envConfigVo } from './config/config.interface';

@Module({
    imports: [
        VmpConfigModule,
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService<envConfigVo>) => ({
                ...config.get('mysqlConfig'),
                entities: [path.join(__dirname, '**', '*.entity.{js,ts}')],
                dateStrings: true,
            }),
            inject: [ConfigService],
        }),
        // 邮件服务
        MailerModule.forRootAsync({
            useFactory: (config: ConfigService<envConfigVo>) => {
                const emailConfig = config.get('emailConfig') as EmailConfig;
                return {
                    ...config.get('emailConfig'),
                    defaults: {
                        from: `测试邮件<${emailConfig.transport.auth.user}>`,
                    },
                    template: {
                        dir: path.join(
                            process.cwd(),
                            'src/modules/tools/template',
                        ),
                        adapter: new EjsAdapter(),
                    },
                };
            },
            inject: [ConfigService],
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
