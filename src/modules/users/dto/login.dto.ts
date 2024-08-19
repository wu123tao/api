import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({ description: '账号', example: '', required: true })
    @IsNotEmpty({ message: '账号不能为空' })
    account: string;

    @ApiProperty({ description: '密码', example: '', required: true })
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
}

export class TokenDto {
    @ApiProperty({ description: '用户token', example: '', required: true })
    token: string;
}
