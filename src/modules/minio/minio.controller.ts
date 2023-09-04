import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
} from '@nestjs/common';
import { MinioService } from './minio.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OKResponse } from 'src/common/decorators/response.decorator';

@ApiTags('文件管理')
@Controller('files')
export class MinioController {
    constructor(private readonly minioService: MinioService) {}

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
    upload(@UploadedFile() file) {
        return this.minioService.upload(file);
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
