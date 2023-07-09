import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_name', comment: '用户名', nullable: true })
    userName: string;

    @Column({ name: 'account', comment: '账号', nullable: true })
    account: string;

    @Column({ name: 'password', comment: '密码', nullable: true })
    password: string;

    @Column({ name: 'role_id', comment: '角色id', nullable: true })
    roleId: string;

    @Column({ name: 'remark', comment: '备注', nullable: true })
    remark: string;
}
