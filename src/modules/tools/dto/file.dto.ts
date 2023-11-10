import { ApiProperty } from '@nestjs/swagger';

export class DeleteFileDto {
    @ApiProperty({ description: 'ids', example: [], required: false })
    ids: string[];
}
