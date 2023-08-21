import { ApiProperty } from '@nestjs/swagger';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';

export class OrganizationDto extends BaseSearchDto {
    @ApiProperty({ description: 'id', required: false })
    id: string;

    @ApiProperty({ description: '公司编号', required: true })
    companyCode: string;

    @ApiProperty({ description: '公司名称', required: true })
    companyName: string;

    @ApiProperty({ description: '公司地址', required: false })
    companyAddress: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
