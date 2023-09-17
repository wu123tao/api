import { Base } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 't_file' })
export class FileEntity extends Base {
    @Column({ name: 'file_name', comment: '文件名称', nullable: true })
    fileName: string;

    @Column('int', {
        name: 'file_size',
        comment: '文件大小',
        nullable: true,
    })
    fileSize: number;

    @Column({
        name: 'url',
        comment: '文件路径',
        nullable: true,
    })
    url: string;

    @Column({
        name: 'etag',
        comment: '文件标识',
        nullable: true,
    })
    etag: string;
}
