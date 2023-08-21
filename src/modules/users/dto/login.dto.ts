import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'id', example: '', required: true })
    account: string;

    @ApiProperty({ description: '用户名', example: '', required: true })
    password: string;
}
