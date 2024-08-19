import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({ description: 'id', example: '', required: true })
    @IsNotEmpty({ message: 'id不能为空' })
    id: string;
}
