import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { RoleDto } from './dto/role.dto';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get('list')
    findAll(@Query() roleDto: RoleDto) {
        return this.roleService.findAll(roleDto);
    }

    @Post('save')
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Post('edit')
    edit(@Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(updateRoleDto);
    }

    @Post('delete')
    remove(@Body() deleteRoleDto: DeleteRoleDto) {
        return this.roleService.remove(deleteRoleDto);
    }

    @Get('detail')
    detail(@Param() id) {
        return this.roleService.findOne(id);
    }
}
