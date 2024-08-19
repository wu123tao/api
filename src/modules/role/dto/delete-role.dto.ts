import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteRoleDto {
    @ApiProperty({ description: 'ids', isArray: true, required: true })
    @IsNotEmpty({ message: '角色id不能为空' })
    ids: string[];
}
