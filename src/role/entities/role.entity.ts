import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_role' })
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'roleCode', comment: '角色编码' })
    roleCode: string;

    @Column({ name: 'role_name', comment: '角色名' })
    roleName: string;

    @Column({ name: 'remark', comment: '备注' })
    remark: string;
}
