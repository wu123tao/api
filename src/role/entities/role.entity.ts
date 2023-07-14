import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_role' })
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'role_code', comment: '角色编码', nullable: true })
    roleCode: string;

    @Column({ name: 'role_name', comment: '角色名', nullable: true })
    roleName: string;

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
