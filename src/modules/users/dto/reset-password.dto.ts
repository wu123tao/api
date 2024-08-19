import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ description: 'id', example: '', required: true })
    @IsNotEmpty({ message: '用户id不能为空' })
    id: string;
}
