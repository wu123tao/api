import { ApiProperty } from '@nestjs/swagger';

export class LabelValueVo {
    @ApiProperty({ description: 'label', example: '', required: true })
    label: string;
    @ApiProperty({ description: 'value', example: '', required: true })
    value: string;
}
