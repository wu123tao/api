import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
    @ApiProperty({ description: 'ids', isArray: true })
    ids: string[];
}
