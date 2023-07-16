import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_organization' })
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_code', comment: '公司编号', nullable: true })
    companyCode: string;

    @Column({ name: 'company_name', comment: '公司名称', nullable: true })
    companyName: string;

    @Column({ name: 'company_address', comment: '公司地址', nullable: true })
    companyAddress: string;

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
