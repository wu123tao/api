import { ApiProperty } from '@nestjs/swagger';

export class IPage {
    @ApiProperty({ description: '页码', example: '', required: false })
    page: number;

    @ApiProperty({ description: '每页数量', example: '', required: false })
    limit: number;
}
