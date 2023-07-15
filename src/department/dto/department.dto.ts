import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
    @ApiProperty({ description: 'id', required: false })
    id: string;
}
