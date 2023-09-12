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
        type: 'timestamp',
        name: 'add_time',
        comment: '添加时间',
        nullable: true,
        // select: false,
    })
    addTime: string;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'edit_time',
        comment: '编辑时间',
        nullable: true,
        update: false,
        // select: false,
    })
    editTime: string;
}
