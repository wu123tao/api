import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RoleModule } from './modules/role/role.module';
import { MinioModule } from './modules/minio/minio.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_URL,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_ACCOUNT,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATA_BASE,
            entities: [join(__dirname, '**', '*.entity.{js,ts}')],
            synchronize: true,
            // 输出sql语句
            // logging: true,
        }),
        UsersModule,
        RoleModule,
        MinioModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
