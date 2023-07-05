import { ApiProperty } from '@nestjs/swagger';
import { FindOperator } from 'typeorm';

export class RoleDto {
    @ApiProperty({ description: 'id', example: '', required: false })
    id: string;

    @ApiProperty({ description: '角色编码', example: '', required: false })
    roleCode: string;

    @ApiProperty({ description: '角色名', example: '', required: false })
    roleName: string;

    @ApiProperty({ description: '备注', example: '', required: false })
    remark: string;

    @ApiProperty({ description: '页码', example: '', required: false })
    page: number;

    @ApiProperty({ description: '每页数量', example: '', required: false })
    pageSize: number;
}
