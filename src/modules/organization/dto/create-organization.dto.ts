import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
    @ApiProperty({ description: '组织编码', required: true })
    companyCode: string;

    @ApiProperty({ description: '组织名称', required: true })
    companyName: string;

    @ApiProperty({ description: '组织地址', required: false })
    companyAddress: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
