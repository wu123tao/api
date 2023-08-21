import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ description: '角色编码', example: '', required: true })
    roleCode: string;

    @ApiProperty({ description: '角色名', example: '', required: true })
    roleName: string;

    @ApiProperty({ description: '备注', example: '' })
    remark: string;
}
