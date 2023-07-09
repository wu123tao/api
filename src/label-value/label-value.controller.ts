import { Controller, Get } from '@nestjs/common';
import { LabelValueService } from './label-value.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LabelValueVo } from './vo/label-value.vo';

@ApiTags('下拉管理')
@Controller('label-value')
export class LabelValueController {
    constructor(private readonly labelValueService: LabelValueService) {}

    @Get('roles')
    @ApiOperation({ summary: '角色下拉' })
    @ApiResponse({
        status: 200,
        description: '响应成功',
        type: LabelValueVo,
        isArray: true,
    })
    findRoleList() {
        return this.labelValueService.roleListDropDown();
    }

    @Get('users')
    @ApiOperation({ summary: '用户下拉' })
    @ApiResponse({
        status: 200,
        description: '响应成功',
        type: LabelValueVo,
        isArray: true,
    })
    findUserList() {
        return this.labelValueService.userListDropDown();
    }
}
