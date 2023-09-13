import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    Get,
} from '@nestjs/common';
import { MinioService } from './minio.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/file.dto';
import {
    OKResponse,
    OKResponseArr,
} from '../../common/decorators/response.decorator';
import { FileVo } from './vo/file.vo';

@ApiTags('文件管理')
@Controller('files')
export class MinioController {
    constructor(private readonly minioService: MinioService) {}

    @ApiOperation({ summary: '文件列表' })
    @Get('list')
    @OKResponseArr(FileVo)
    fileList() {
        return this.minioService.fileList();
    }

    @ApiOperation({ summary: '删除文件' })
    @Post('delete')
    @OKResponse()
    deleteFile(@Body() body: DeleteFileDto) {
        return this.minioService.deleteFile(body);
    }

    @ApiOperation({ summary: '文件上传' })
    @Post('upload')
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
        return this.minioService.singleUpload(file);
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
    //     return this.minioService.chunkUpload(file, body);
    // }

    // @Post('mergeFile')
    // @ApiOperation({ summary: '合并文件' })
    // @OKResponse()
    // mergeFile(@Body() fileInfo) {
    //     return this.minioService.mergeFile(fileInfo);
    // }

    @ApiOperation({ summary: '文件切片上传(保存到本地)' })
    @Post('chunkUpload')
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
        return this.minioService.chunkUploadToLocal(file, body);
    }

    @Post('mergeFile')
    @ApiOperation({ summary: '合并文件(保存到本地)' })
    @OKResponse()
    mergeFileToLocal(@Body() fileInfo) {
        return this.minioService.mergeFileToLocal(fileInfo);
    }
}
