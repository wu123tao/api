import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrganizationDto } from './dto/organization.dto';
import { omit } from 'lodash';
import { DeleteOrganizationDto } from './dto/delete-organization.dto';

@ApiTags('组织管理')
@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Post('save')
    @ApiOperation({ summary: '新增组织' })
    create(@Body() createOrganizationDto: CreateOrganizationDto) {
        return this.organizationService.create(createOrganizationDto);
    }

    @Get('list')
    @ApiOperation({ summary: '组织列表' })
    findAll(@Query() organizationDto: OrganizationDto) {
        const searchParams = {
            ...omit(organizationDto, ['page', 'limit']),
        } as OrganizationDto;
        const pageParams = {
            limit: organizationDto.limit ?? 3,
            page: organizationDto.page ?? 1,
        };

        return this.organizationService.findAll(searchParams, pageParams);
    }

    @Get('detail')
    findOne(@Query('id') id: string) {
        return this.organizationService.findOne(id);
    }

    @Post('edit')
    @ApiOperation({ summary: '编辑组织' })
    update(@Body() updateOrganizationDto: UpdateOrganizationDto) {
        return this.organizationService.update(updateOrganizationDto);
    }

    @Post('delete')
    @ApiOperation({ summary: '删除组织' })
    remove(@Body() deleteOrganizationDto: DeleteOrganizationDto) {
        return this.organizationService.remove(deleteOrganizationDto);
    }
}
