import { ApiProperty } from '@nestjs/swagger';

export class RoleVo {
    @ApiProperty({ description: 'id', example: '', required: false })
    id: string;

    @ApiProperty({ description: '角色编码', example: '', required: false })
    roleCode: string;

    @ApiProperty({ description: '角色名', example: '', required: false })
    roleName: string;

    @ApiProperty({ description: '备注', example: '', required: false })
    remark: string;
}
