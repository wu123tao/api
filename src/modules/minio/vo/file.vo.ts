import { ApiProperty } from '@nestjs/swagger';

export class FileVo {
    @ApiProperty({ description: 'id', example: '', required: true })
    id: string;

    @ApiProperty({ description: '文件名称', example: '', required: true })
    fileName: string;

    @ApiProperty({ description: '文件大小', example: '', required: true })
    fileSize: number;

    @ApiProperty({ description: '添加时间', example: '', required: true })
    addTime: Date;

    @ApiProperty({ description: '修改时间', example: '', required: true })
    editTime: Date;
}
