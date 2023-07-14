import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentDto } from './dto/department.dto';
import { omit } from 'lodash';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';

@ApiTags('部门管理')
@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Post('save')
    @ApiOperation({ summary: '新增部门' })
    create(@Body() createOrganizationDto: CreateDepartmentDto) {
        return this.departmentService.create(createOrganizationDto);
    }

    @Get('list')
    @ApiOperation({ summary: '部门列表' })
    findAll(@Query() organizationDto: DepartmentDto) {
        const searchParams = {
            ...omit(organizationDto, ['page', 'limit']),
        } as DepartmentDto;
        const pageParams = {
            limit: organizationDto.limit ?? 3,
            page: organizationDto.page ?? 1,
        };

        return this.departmentService.findAll(searchParams, pageParams);
    }

    @Get('detail')
    findOne(@Query('id') id: string) {
        return this.departmentService.findOne(id);
    }

    @Post('edit')
    @ApiOperation({ summary: '编辑部门' })
    update(@Body() updateOrganizationDto: UpdateDepartmentDto) {
        return this.departmentService.update(updateOrganizationDto);
    }

    @Post('delete')
    @ApiOperation({ summary: '删除部门' })
    remove(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
        return this.departmentService.remove(deleteDepartmentDto);
    }
}
