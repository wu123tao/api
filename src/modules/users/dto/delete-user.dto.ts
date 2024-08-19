import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
    @ApiProperty({ description: 'ids', isArray: true, required: true })
    @IsNotEmpty({ message: '用户id不能为空' })
    ids: string[];
}
