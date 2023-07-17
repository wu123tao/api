import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { RoleDto } from './dto/role.dto';
import { omit } from 'lodash';
import {
    OKResponse,
    OKResponseData,
    PageResponse,
} from 'src/common/decorators/response.decorator';
import { RoleVo } from './vo/role.vo';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('list')
    @ApiOperation({ summary: '角色列表' })
    @PageResponse(RoleVo)
    findAll(@Query() roleDto: RoleDto) {
        const searchParams = { ...omit(roleDto, ['page', 'limit']) } as RoleDto;
        const pageParams = {
            limit: roleDto.limit ?? 3,
            page: roleDto.page ?? 1,
        };
        return this.roleService.findAll(searchParams, pageParams);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('save')
    @ApiOperation({ summary: '新增角色' })
    @OKResponse()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    @OKResponse()
    @ApiOperation({ summary: '编辑角色' })
    edit(@Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(updateRoleDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('delete')
    @ApiOperation({ summary: '删除角色' })
    @OKResponse()
    remove(@Body() deleteRoleDto: DeleteRoleDto) {
        return this.roleService.remove(deleteRoleDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('detail')
    @ApiOperation({ summary: '角色详情' })
    @OKResponseData(RoleVo)
    detail(@Param() id) {
        return this.roleService.findOne(id);
    }
}
