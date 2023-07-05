import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: '账号', required: false })
    account: string;

    @ApiProperty({ description: '用户名', required: false })
    userName: string;

    @ApiProperty({ description: '密码', required: false })
    password: string;

    @ApiProperty({ description: '角色id', required: false })
    roleId: string;

    @ApiProperty({ description: '角色id', required: false })
    remark: string;
}
