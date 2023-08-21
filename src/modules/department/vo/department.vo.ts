import { ApiProperty } from '@nestjs/swagger';

export class DepartmentVo {
    @ApiProperty({ description: 'id' })
    id: string;

    @ApiProperty({ description: '部门编号' })
    departmentCode: string;

    @ApiProperty({ description: '部门名称' })
    departmentName: string;

    @ApiProperty({ description: '父级部门id' })
    deptParentId: string;

    @ApiProperty({ description: '组织id' })
    organizationId: string;

    @ApiProperty({ description: '子部门', isArray: true })
    departmentVoList: DepartmentVo[];
}
