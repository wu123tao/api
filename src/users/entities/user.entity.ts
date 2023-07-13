import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 't_user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_name', comment: '用户名', nullable: true })
    userName: string;

    @Column({ name: 'user_code', comment: '用户编码', nullable: true })
    userCode: string;

    @Column({ name: 'account', comment: '账号', nullable: true })
    account: string;

    @Column({ name: 'password', comment: '密码', nullable: true })
    password: string;

    @Column({ name: 'role_id', comment: '角色id', nullable: true })
    roleId: string;

    @Column({ name: 'role_name', comment: '角色名', nullable: true })
    roleName: string;

    @Column({ name: 'user_email', comment: '邮箱', nullable: true })
    userEmail: string;

    @Column({ name: 'user_phone', comment: '手机号', nullable: true })
    userPhone: string;

    @Column({ name: 'remark', comment: '备注', nullable: true })
    remark: string;

    @CreateDateColumn({
        name: 'edit_time',
        comment: '备注',
        nullable: true,
        type: 'timestamp',
    })
    editTime: Date;
}
