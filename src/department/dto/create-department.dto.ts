import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
    @ApiProperty({ description: '组织编码', required: true })
    departmentCode: string;

    @ApiProperty({ description: '组织名称', required: true })
    departmentName: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
