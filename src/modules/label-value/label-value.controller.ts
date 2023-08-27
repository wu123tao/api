import { Controller, Get } from '@nestjs/common';
import { LabelValueService } from './label-value.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LabelValueVo } from './vo/label-value.vo';
import { OKResponseArr } from 'src/common/decorators/response.decorator';

@ApiTags('下拉管理')
@Controller('label-value')
export class LabelValueController {
    constructor(private readonly labelValueService: LabelValueService) {}

    @Get('roles')
    @ApiOperation({ summary: '角色下拉' })
    @OKResponseArr(LabelValueVo)
    findRoleList() {
        return this.labelValueService.roleListDropDown();
    }

    @Get('users')
    @ApiOperation({ summary: '用户下拉' })
    @OKResponseArr(LabelValueVo)
    findUserList() {
        return this.labelValueService.userListDropDown();
    }

    @Get('organization')
    @ApiOperation({ summary: '组织下拉' })
    @OKResponseArr(LabelValueVo)
    findOrganizationList() {
        return this.labelValueService.organizationListDropDown();
    }
}
