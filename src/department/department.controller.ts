import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentDto } from './dto/department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';

@ApiTags('部门管理')
@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Post('save')
    @ApiOperation({ summary: '新增部门' })
    create(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentService.create(createDepartmentDto);
    }

    @Get('list')
    @ApiOperation({ summary: '根据组织部门列表' })
    findAll(@Query() departmentDto: DepartmentDto) {
        return this.departmentService.findAll(departmentDto);
    }

    @Get('detail')
    findOne(@Query('id') id: string) {
        return this.departmentService.findOne(id);
    }

    @Post('edit')
    @ApiOperation({ summary: '编辑部门' })
    update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.update(updateDepartmentDto);
    }

    @Post('delete')
    @ApiOperation({ summary: '删除部门' })
    remove(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
        return this.departmentService.remove(deleteDepartmentDto);
    }
}
