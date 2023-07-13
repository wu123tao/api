import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: '用户编码', required: true })
    userCode: string;

    @ApiProperty({ description: '账号', required: true })
    account: string;

    @ApiProperty({ description: '用户名', required: true })
    userName: string;

    @ApiProperty({ description: '密码', required: true })
    password: string;

    @ApiProperty({ description: '角色id', required: true })
    roleId: string;

    @ApiProperty({ description: '角色名', required: true })
    roleName: string;

    @ApiProperty({ description: '邮箱', required: true })
    userEmail: string;

    @ApiProperty({ description: '手机号', required: true })
    userPhone: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
