import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as MinIO from 'minio';

@Injectable()
export class MinioService {
    private readonly minioClient: MinIO.Client;
    private readonly bucket: string = process.env.MINIO_BUCKET;

    constructor() {
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
