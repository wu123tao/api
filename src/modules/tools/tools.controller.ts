import { Controller, Post } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// 是否在swagger上隐藏接口的显示
// @ApiExcludeController(true)
@ApiTags('系统工具服务')
@Controller('email')
export class ToolsController {
    constructor(private readonly emailService: ToolsService) {}

    @ApiOperation({ summary: '测试发送邮件' })
    @Post('list')
    fileList() {
        return this.emailService.sendEmail();
    }
}
