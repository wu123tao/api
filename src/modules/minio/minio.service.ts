import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as MinIO from 'minio';

@Injectable()
export class MinioService {
    private readonly minioClient: MinIO.Client;

    constructor() {
        this.minioClient = new MinIO.Client({
            endPoint: '124.222.52.234',
            port: 9000,
            useSSL: false,
            accessKey: '3EOJJkxgAzpTLugFNgBq',
            secretKey: 'zMvk7uOikCWx7c46oOjUx1Gvy3KyvC6ZIHzWlgFi',
        });
    }

    upload(file) {
        if (!file) {
            throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
        }
        console.log(file);

        return this.initMinIO(file.originalname as string, file.buffer);
    }

    async initMinIO(objectName: string, data: Buffer) {
        const isExistBucket = await this.bucketExist(this.minioClient, 'test');
        if (!isExistBucket) {
            await this.createBucket(this.minioClient, 'test');
        }

        // 文件上传
        const res = await this.minioClient.putObject('test', objectName, data);
        if (!res.etag) {
            throw new HttpException('上传失败', HttpStatus.BAD_REQUEST);
        }

        return `http://124.222.52.234:9000/test/${objectName}`;
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
