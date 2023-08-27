import { Base } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 't_role' })
export class Role extends Base {
    @Column({ name: 'role_code', comment: '角色编码', nullable: true })
    roleCode: string;

    @Column({ name: 'role_name', comment: '角色名', nullable: true })
    roleName: string;

    @Column({ name: 'remark', comment: '备注', nullable: true })
    remark: string;
}
