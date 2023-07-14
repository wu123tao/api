import { ApiProperty } from '@nestjs/swagger';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';

export class DepartmentDto extends BaseSearchDto {
    @ApiProperty({ description: 'id' })
    id: string;

    @ApiProperty({ description: '部门编号' })
    departmentCode: string;

    @ApiProperty({ description: '部门名称' })
    departmentName: string;

    @ApiProperty({ description: '备注' })
    remark: string;
}
