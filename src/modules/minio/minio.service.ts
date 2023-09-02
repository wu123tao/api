import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as MinIO from 'minio';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import * as path from 'path';
import { Stream } from 'stream';

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

    async chunkUpload(file: Express.Multer.File, body) {
        if (!file) {
            throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
        }

        await this.uploadToMinIO(body.fileName, file.buffer, body.uuid);
    }

    async mergeFile(fileInfo) {
        console.log(fileInfo);

        const res = await this.minioClient.listObjects(fileInfo.uuid, '', true);

        console.log(res);

        // minio 返回的是文件流，需要做下处理
        const fileList = await this.readData(res);
        console.log(fileList);
        return fileList;
    }
    async readData(stream: Stream) {
        return new Promise((resolve, reject) => {
            const a = [];
            stream
                .on('data', (row) => {
                    a.push(row);
                })
                .on('end', () => {
                    resolve(a);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    // chunkUpload(file: Express.Multer.File, body) {
    //     if (!file) {
    //         throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
    //     }
    //     console.log(body);

    //     const chunkFilePath = path.join(
    //         __dirname,
    //         '../../..',
    //         `uploads/chunk/${body.uuid}`,
    //     );

    //     if (!fs.existsSync(chunkFilePath)) {
    //         fs.mkdirSync(chunkFilePath, { recursive: true });
    //     }

    //     fs.writeFileSync(`${chunkFilePath}/${body.fileName}`, file.buffer);
    // }

    // mergeFile(fileInfo) {
    //     console.log(fileInfo);
    //     const sourceFiles = path.join(
    //         __dirname,
    //         '../../..',
    //         `uploads/chunk/${fileInfo.uuid}`,
    //     );
    //     console.log(sourceFiles);

    //     const targetFile = path.join(
    //         __dirname,
    //         '../../..',
    //         `uploads/${fileInfo.fileName}`,
    //     );
    //     this.mergeChunkFile(sourceFiles, targetFile);
    // }

    /**
     * 合并切片
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
     * 读取切片 文件流
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
            fs.rmSync(sourceFiles, { recursive: true, force: true });
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

    // 文件传统上传
    async uploadToMinIO(
        objectName: string,
        data: Buffer,
        bucket: string = this.bucket,
    ) {
        const isExistBucket = await this.bucketExist(this.minioClient, bucket);
        if (!isExistBucket) {
            await this.minioClient.makeBucket(bucket);
        }

        // minio中是否有相同的文件
        const fileInfo = await this.minioClient.statObject(
            this.bucket,
            objectName,
        );
        if (fileInfo && fileInfo.etag) {
            return `${process.env.MINIO_URL}/${objectName}`;
        }

        // 文件上传
        const res = await this.minioClient.putObject(bucket, objectName, data);
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
}
