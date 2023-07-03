import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: '账号', example: '' })
    account: string;

    @ApiProperty({ description: '用户名', example: '' })
    userName: string;

    @ApiProperty({ description: '密码', example: '' })
    password: string;

    @ApiProperty({ description: '账号', example: '' })
    id: string;
}
