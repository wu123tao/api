import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 't_organization' })
export class Organization extends Base {
    @Column({ name: 'company_code', comment: '公司编号', nullable: true })
    companyCode: string;

    @Column({ name: 'company_name', comment: '公司名称', nullable: true })
    companyName: string;

    @Column({ name: 'company_address', comment: '公司地址', nullable: true })
    companyAddress: string;

    @Column({ name: 'remark', comment: '备注', nullable: true })
    remark: string;
}
