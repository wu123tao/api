import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn({
        name: 'add_time',
        comment: '添加时间',
        nullable: true,
    })
    addTime: Date;

    @UpdateDateColumn({
        name: 'edit_time',
        comment: '编辑时间',
        nullable: true,
        update: false,
    })
    editTime: Date;
}
