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
import { OKResponse } from 'src/common/decorators/response.decorator';
import { CreateMinIODto } from './dto/create-minio.dto';

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

    @ApiOperation({ summary: '文件切片上传' })
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
    chunkUpload(@UploadedFile() file) {
        return this.minioService.chunkUpload(file);
    }

    @Post('save')
    @ApiOperation({ summary: '添加redis缓存' })
    @OKResponse()
    save(@Body() createMinIODto: CreateMinIODto) {
        return this.minioService.save(createMinIODto);
    }

    @Get('save')
    @ApiOperation({ summary: '获取redis缓存' })
    @OKResponse()
    getCache() {
        return this.minioService.getCache();
    }
}
