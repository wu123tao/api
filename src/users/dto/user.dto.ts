import { ApiProperty } from '@nestjs/swagger';
import { FindOperator } from 'typeorm';

export class UserDto {
    @ApiProperty({ description: 'id', example: '', required: false })
    id: string;

    @ApiProperty({ description: '用户名', example: '', required: false })
    userName: string;

    @ApiProperty({ description: '账号', example: '', required: false })
    account: string;

    @ApiProperty({ description: '备注', example: '', required: false })
    remark: string;

    @ApiProperty({ description: '页码', example: '', required: false })
    page: number;

    @ApiProperty({ description: '每页数量', example: '', required: false })
    pageSize: number;
}
