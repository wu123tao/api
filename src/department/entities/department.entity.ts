import { Base } from 'src/common/entities/base.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_department' })
export class Department extends Base {
    @Column({ name: 'department_code', comment: '部门编号', nullable: true })
    departmentCode: string;

    @Column({ name: 'department_name', comment: '部门名称', nullable: true })
    departmentName: string;

    @Column({ name: 'deptParent_id', comment: '父级部门id', nullable: true })
    deptParentId: string;

    @Column({ name: 'organization_id', comment: '组织id', nullable: true })
    organizationId: string;
}
