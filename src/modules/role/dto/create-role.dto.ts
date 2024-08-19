import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ description: '角色编码', example: '', required: true })
    @IsNotEmpty({ message: '角色编码不能为空' })
    roleCode: string;

    @ApiProperty({ description: '角色名', example: '', required: true })
    @IsNotEmpty({ message: '角色名不能为空' })
    roleName: string;

    @ApiProperty({ description: '备注', example: '' })
    remark: string;
}
