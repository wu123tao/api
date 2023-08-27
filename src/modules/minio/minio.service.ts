import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as MinIO from 'minio';
import { CreateMinIODto } from './dto/create-minio.dto';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MinioService {
    private readonly minioClient: MinIO.Client;
    private readonly bucket: string = process.env.MINIO_BUCKET;

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {
        this.minioClient = new MinIO.Client({
            endPoint: process.env.SERVER_URL,
            port: Number(process.env.MINIO_PORT),
            useSSL: false,
            accessKey: process.env.MINIO_ACCESSKEY,
            secretKey: process.env.MINIO_SECRETKEY,
        });
    }

    upload(file) {
        if (!file) {
            throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
        }
        console.log(file);

        return this.uploadToMinIO(file.originalname as string, file.buffer);
    }

    chunkUpload(file: Express.Multer.File, body) {
        if (!file) {
            throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
        }
        console.log(body);

        const chunkFilePath = path.join(
            __dirname,
            '../../..',
            `uploads/chunk/${body.uuid}`,
        );

        if (!fs.existsSync(chunkFilePath)) {
            fs.mkdirSync(chunkFilePath, { recursive: true });
        }

        fs.writeFileSync(`${chunkFilePath}/${body.fileName}`, file.buffer);
    }

    mergeFile(fileInfo) {
        console.log(fileInfo);
        const sourceFiles = path.join(
            __dirname,
            '../../..',
            `uploads/chunk/${fileInfo.uuid}`,
        );
        console.log(sourceFiles);

        const targetFile = path.join(
            __dirname,
            '../../..',
            `uploads/${fileInfo.fileName}`,
        );
        this.mergeChunkFile(sourceFiles, targetFile);

        fs.rmSync(sourceFiles, { recursive: true, force: true });
    }

    /**
     *
     * @param sourceFile 源文件
     * @param targetFile 目标文件
     */
    mergeChunkFile(sourceFiles, targetFile) {
        const chunkFilesDir = sourceFiles;
        console.log(chunkFilesDir);

        const list = fs.readdirSync(chunkFilesDir);
        console.log(list);

        const filesList = list.map((name) => ({
            name: name,
            filePath: path.resolve(chunkFilesDir, name),
        }));

        console.log(filesList);

        const fileWriteStream = fs.createWriteStream(targetFile);

        this.chunkStreamMergeProcess(filesList, fileWriteStream, sourceFiles);
    }

    /**
     *
     * @param fileList 文件数据
     * @param fileWriteStream 最终的写入文件
     * @param sourceFiles 文件路径
     */
    chunkStreamMergeProcess(
        fileList: any[],
        fileWriteStream: fs.WriteStream,
        sourceFiles,
    ) {
        if (!fileList.length) {
            fileWriteStream.end('完成了');
            return;
        }

        // 取第一个数据
        const data = fileList.shift();
        const { filePath: chunkFilePath } = data;

        // 读取文件
        const currentReadStream = fs.createReadStream(chunkFilePath);

        // 把结果往最终的生成文件上进行拼接
        currentReadStream.pipe(fileWriteStream, { end: false });

        currentReadStream.on('end', () => {
            // 拼接完之后进入下一次循环
            this.chunkStreamMergeProcess(
                fileList,
                fileWriteStream,
                sourceFiles,
            );
        });
    }

    async save(createMinIODto: CreateMinIODto) {
        console.log(createMinIODto);
        const res = await this.cacheManager.set(
            'roleCode',
            createMinIODto.roleCode,
        );
        console.log(res, '设置缓存');
    }

    async getCache() {
        const res = await this.cacheManager.get('roleCode');
        console.log('获取缓存', res);
    }

    async uploadToMinIO(objectName: string, data: Buffer) {
        const isExistBucket = await this.bucketExist(
            this.minioClient,
            this.bucket,
        );
        if (!isExistBucket) {
            await this.createBucket(this.minioClient, this.bucket);
        }

        // 文件上传
        const res = await this.minioClient.putObject(
            this.bucket,
            objectName,
            data,
        );
        if (!res.etag) {
            throw new HttpException('上传失败', HttpStatus.BAD_REQUEST);
        }
        return `${process.env.MINIO_URL}/${objectName}`;
    }

    /**
     * 判断bucket是否存在
     */
    async bucketExist(minioClient: MinIO.Client, bucketName: string) {
        // 检查是否存在bucketList
        const listBuckets = await minioClient.listBuckets();

        // 如果存在bucketList的话再判断是否存在相同名称的bucketName
        const existBucketName = listBuckets.find(
            (bucket) => bucket.name === bucketName,
        );

        if (!existBucketName) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }

    /**
     * 创建bucket
     */
    createBucket(minioClient: MinIO.Client, bucketName: string) {
        return new Promise<boolean>((resolve) => {
            minioClient.makeBucket(bucketName, 'us-east-1', (error) => {
                if (error === null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}
