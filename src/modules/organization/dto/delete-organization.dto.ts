import { ApiProperty } from '@nestjs/swagger';

export class DeleteOrganizationDto {
    @ApiProperty({ description: 'ids', isArray: true, required: true })
    ids: string[];
}
