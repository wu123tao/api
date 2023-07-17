import { ApiProperty } from '@nestjs/swagger';

export class UserVo {
    @ApiProperty({ description: 'id', default: '' })
    id: string;

    @ApiProperty({ description: '用户编码', default: '' })
    userCode: string;

    @ApiProperty({ description: '用户名', default: '' })
    userName: string;

    @ApiProperty({ description: '账号', default: '' })
    account: string;

    @ApiProperty({ description: '角色id', default: '' })
    roleId: string;

    @ApiProperty({ description: '邮箱', default: '' })
    userEmail: string;

    @ApiProperty({ description: '手机号', default: '' })
    userPhone: string;

    @ApiProperty({ description: '备注', default: '' })
    remark: string;
}
