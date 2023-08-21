import { ApiProperty } from '@nestjs/swagger';

export class DeleteDepartmentDto {
    @ApiProperty({ description: 'ids', isArray: true, required: true })
    ids: string[];
}
