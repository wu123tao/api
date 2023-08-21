import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RoleModule } from './modules/role/role.module';
import { LabelValueModule } from './modules/label-value/label-value.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { DepartmentModule } from './modules/department/department.module';

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
            // 输出sql语句
            logging: true,
        }),
        UsersModule,
        RoleModule,
        LabelValueModule,
        OrganizationModule,
        DepartmentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
