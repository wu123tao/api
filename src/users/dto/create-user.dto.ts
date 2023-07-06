import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: '账号', required: true })
    account: string;

    @ApiProperty({ description: '用户名', required: true })
    userName: string;

    @ApiProperty({ description: '密码', required: true })
    password: string;

    @ApiProperty({ description: '角色id', required: true })
    roleId: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
