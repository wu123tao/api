import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentDto } from './dto/department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';
import {
    OKResponse,
    OKResponseData,
} from 'src/common/decorators/response.decorator';
import { DepartmentVo } from './vo/department.vo';
import { DepartmentItemVo } from './vo/departmentItem.vo';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('部门管理')
@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Post('save')
    @ApiOperation({ summary: '新增部门' })
    @OKResponse()
    create(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentService.create(createDepartmentDto);
    }

    @Get('list')
    @ApiOperation({ summary: '根据组织部门列表' })
    @OKResponseData(DepartmentVo)
    findAll(@Query() departmentDto: DepartmentDto) {
        return this.departmentService.findAll(departmentDto);
    }

    @Get('detail')
    @ApiOperation({ summary: '详情' })
    @OKResponseData(DepartmentItemVo)
    findOne(@Query('id') id: string) {
        return this.departmentService.findOne(id);
    }

    @Post('edit')
    @ApiOperation({ summary: '编辑部门' })
    @OKResponse()
    update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.update(updateDepartmentDto);
    }

    @Post('delete')
    @ApiOperation({ summary: '删除部门' })
    @OKResponse()
    remove(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
        return this.departmentService.remove(deleteDepartmentDto);
    }
}
