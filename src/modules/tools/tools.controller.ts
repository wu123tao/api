import { Controller } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

@ApiExcludeController(true)
@ApiTags('系统工具服务')
@Controller('email')
export class ToolsController {
    constructor(private readonly emailService: ToolsService) {}
}
