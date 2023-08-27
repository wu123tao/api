import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as MinIO from 'minio';
import { CreateMinIODto } from './dto/create-minio.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class MinioService {
    private readonly minioClient: MinIO.Client;
    private readonly bucket: string = process.env.MINIO_BUCKET;
    private chunkCount: number = 0;

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) {
        this.chunkCount = 0;
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

    chunkUpload(file) {
        if (!file) {
            throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
        }
        console.log(file);

        // this.cacheManager.set(file.originalname, file.buffer);

        const fileNameFlag = (file.originalname as string).split('$$');

        if (fileNameFlag[1]) {
            this.chunkCount = Number(fileNameFlag[1]);
        } else {
            this.chunkCount++;
            console.log(`总共分了：${this.chunkCount}片`);
        }
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
