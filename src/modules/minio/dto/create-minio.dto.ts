import { ApiProperty } from '@nestjs/swagger';

export class CreateMinIODto {
    @ApiProperty({ description: '角色编码', example: '', required: true })
    roleCode: string;
}
