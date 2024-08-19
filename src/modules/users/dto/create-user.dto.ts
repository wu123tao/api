import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: '用户编码', required: true, default: '' })
    @IsNotEmpty({ message: '用户编码不能为空' })
    userCode: string;

    @ApiProperty({ description: '账号', required: true, default: '' })
    @IsNotEmpty({ message: '账号不能为空' })
    account: string;

    @ApiProperty({ description: '用户名', required: true, default: '' })
    @IsNotEmpty({ message: '用户名不能为空' })
    userName: string;

    @ApiProperty({ description: '密码', required: true, default: '' })
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;

    @ApiProperty({ description: '角色id', required: true, default: '' })
    @IsNotEmpty({ message: '角色不能为空' })
    roleId: string;

    @ApiProperty({ description: '邮箱', required: false, default: '' })
    userEmail: string;

    @ApiProperty({ description: '手机号', required: false, default: '' })
    userPhone: string;

    @ApiProperty({ description: '备注', required: false, default: '' })
    remark: string;
}
