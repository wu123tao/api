import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    OKResponse,
    OKResponseArr,
} from 'src/common/decorators/response.decorator';
import { FileVo } from './vo/file.vo';
import { DeleteFileDto } from './dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

// 是否在swagger上隐藏接口的显示
// @ApiExcludeController(true)
@ApiTags('系统工具服务')
@Controller('tools')
export class ToolsController {
    constructor(private readonly toolsService: ToolsService) {}

    @ApiOperation({ summary: '测试发送邮件' })
    @Post('email/send')
    sendEmail() {
        return this.toolsService.sendEmail();
    }

    @ApiOperation({ summary: '文件列表' })
    @Get('files/list')
    @OKResponseArr(FileVo)
    fileList() {
        return this.toolsService.fileList();
    }

    @ApiOperation({ summary: '删除文件' })
    @Post('files/delete')
    @OKResponse()
    deleteFile(@Body() body: DeleteFileDto) {
        return this.toolsService.deleteFile(body);
    }

    @ApiOperation({ summary: '文件上传' })
    @Post('files/upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    description: '文件',
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    upload(@UploadedFile() file: Express.Multer.File) {
        return this.toolsService.singleUpload(file);
    }

    // @ApiOperation({ summary: '文件切片上传' })
    // @Post('chunkUpload')
    // @UseInterceptors(FileInterceptor('file'))
    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             file: {
    //                 description: '文件',
    //                 type: 'string',
    //                 format: 'binary',
    //             },
    //         },
    //     },
    // })
    // chunkUpload(@UploadedFile() file: Express.Multer.File, @Body() body) {
    //     return this.toolsService.chunkUpload(file, body);
    // }

    // @Post('mergeFile')
    // @ApiOperation({ summary: '合并文件' })
    // @OKResponse()
    // mergeFile(@Body() fileInfo) {
    //     return this.toolsService.mergeFile(fileInfo);
    // }

    @ApiOperation({ summary: '文件切片上传(保存到本地)' })
    @Post('files/chunkUpload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    description: '文件',
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    chunkUploadToLocal(
        @UploadedFile() file: Express.Multer.File,
        @Body() body,
    ) {
        return this.toolsService.chunkUploadToLocal(file, body);
    }

    @Post('files/mergeFile')
    @ApiOperation({ summary: '合并文件(保存到本地)' })
    @OKResponse()
    mergeFileToLocal(@Body() fileInfo) {
        return this.toolsService.mergeFileToLocal(fileInfo);
    }
}
