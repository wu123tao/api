import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleDto {
    @ApiProperty({ description: 'ids', isArray: true, required: true })
    ids: string[];
}
