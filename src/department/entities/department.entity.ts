import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_department' })
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'department_code', comment: '部门编号', nullable: true })
    departmentCode: string;

    @Column({ name: 'department_name', comment: '部门名称', nullable: true })
    departmentName: string;

    @Column({ name: 'remark', comment: '备注', nullable: true })
    remark: string;
}
