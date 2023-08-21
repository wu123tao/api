import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Department, Organization])],
    controllers: [DepartmentController],
    providers: [DepartmentService],
})
export class DepartmentModule {}
