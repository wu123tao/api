import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_role' })
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'roleCode', comment: '角色编码', nullable: true })
    roleCode: string;

    @Column({ name: 'role_name', comment: '角色名', nullable: true })
    roleName: string;

    @Column({ name: 'remark', comment: '备注', nullable: true })
    remark: string;
}
