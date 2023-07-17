import { ApiProperty } from '@nestjs/swagger';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';

export class OrganizationVo extends BaseSearchDto {
    @ApiProperty({ description: 'id' })
    id: string;

    @ApiProperty({ description: '公司编号' })
    companyCode: string;

    @ApiProperty({ description: '公司名称' })
    companyName: string;

    @ApiProperty({ description: '公司地址' })
    companyAddress: string;

    @ApiProperty({ description: '备注' })
    remark: string;
}
