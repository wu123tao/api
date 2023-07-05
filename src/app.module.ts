import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RoleModule } from './role/role.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [join(__dirname, '**', '*.entity.{js,ts}')],
            synchronize: true,
        }),
        UsersModule,
        RoleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
