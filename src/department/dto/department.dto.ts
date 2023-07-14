import { ApiProperty } from '@nestjs/swagger';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';

export class DepartmentDto extends BaseSearchDto {
    @ApiProperty({ description: 'id', required: false })
    id: string;

    @ApiProperty({ description: '部门编号', required: false })
    departmentCode: string;

    @ApiProperty({ description: '部门名称', required: false })
    departmentName: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
