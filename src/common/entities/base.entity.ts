import {
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export class Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
