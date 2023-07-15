import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
    @ApiProperty({ description: '部门编码', required: true })
    departmentCode: string;

    @ApiProperty({ description: '部门名称', required: true })
    departmentName: string;

    @ApiProperty({ description: '父部门id', required: true })
    deptParentId: string;

    @ApiProperty({ description: '组织id', required: true })
    organizationId: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
