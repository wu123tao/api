import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as MinIO from 'minio';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { MinioConfig, envConfigVo } from 'src/config/config.interface';
import { In, Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MinioService {
    private readonly minioClient: MinIO.Client;
    private readonly bucket: string;
    private readonly baseFileUrl: string;

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
        private configService: ConfigService<envConfigVo>,
    ) {
        const minioConfig = this.configService.get(
            'minioConfig',
        ) as MinioConfig;

        const MinioInfo = { ...minioConfig } as MinioConfig;

        this.bucket = minioConfig.bucket;

        this.baseFileUrl = `http://${MinioInfo.endPoint}:${MinioInfo.port}/${MinioInfo.bucket}/`;

        this.minioClient = new MinIO.Client(minioConfig);
    }

    async fileList() {
        const fileList = await this.fileRepository.find();
        return fileList;
    }

    async deleteFile({ ids }: { ids: string[] }) {
        const list = await this.fileRepository.find({ where: { id: In(ids) } });
        if (!list.length) {
            return;
        }

        const listIds = list.map((item) => item.id);
        await this.fileRepository.delete(listIds);

        const fileNames = list.map((item) => item.fileName);
        await this.minioClient.removeObjects(this.bucket, fileNames);
    }

    async singleUpload(file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
        }

        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
        );

        const fileUrl = await this.uploadToMinIO(
            file.originalname as string,
            file.buffer,
        );
        const statObject = await this.minioClient.statObject(
            this.bucket,
            file.originalname,
        );

        const fileInDataBaseInfo = await this.fileRepository.findOneBy({
            etag: statObject.etag,
        });
        if (fileInDataBaseInfo) {
            return fileInDataBaseInfo.url;
        }

        const res = await this.fileRepository.save({
            fileName: file.originalname,
            fileSize: statObject.size,
            url: fileUrl,
            etag: statObject.etag,
        });
        return res.url;
    }

    chunkUploadToLocal(file: Express.Multer.File, body) {
        if (!file) {
            throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
        }
        // console.log(body);
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
        );

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

    async mergeFileToLocal(fileInfo) {
        const sourceFiles = path.join(
            __dirname,
            '../../..',
            `uploads/chunk/${fileInfo.uuid}`,
        );
        // console.log(sourceFiles);

        const targetFile = path.join(
            __dirname,
            '../../..',
            `uploads/${fileInfo.fileName}`,
        );
        await this.mergeChunkFile(sourceFiles, targetFile, fileInfo.fileName);
    }

    /**
     * 合并切片
     * @param sourceFile 源文件
     * @param targetFile 目标文件
     */
    async mergeChunkFile(sourceFiles, targetFile, fileName) {
        const chunkFilesDir = sourceFiles;

        const list = fs.readdirSync(chunkFilesDir);

        const filesList = list.map((name) => ({
            name: name,
            filePath: path.resolve(chunkFilesDir, name),
        }));

        const fileWriteStream = fs.createWriteStream(targetFile);

        await this.chunkStreamMergeProcess(
            filesList,
            fileWriteStream,
            sourceFiles,
            targetFile,
            fileName,
        );
    }

    /**
     * 读取切片 文件流
     * @param fileList 文件数据
     * @param fileWriteStream 最终的写入文件
     * @param sourceFiles 文件路径
     * @param targetFile 文件路径
     */
    async chunkStreamMergeProcess(
        fileList: any[],
        fileWriteStream: fs.WriteStream,
        sourceFiles,
        targetFile,
        fileName,
    ) {
        if (!fileList.length) {
            fileWriteStream.end('完成了');
            fs.rmSync(sourceFiles, { recursive: true, force: true });

            const fileStream = fs.createReadStream(targetFile);

            const fileUrl = await this.uploadToMinIO(
                fileName,
                fileStream,
                this.bucket,
            );

            const statObject = await this.minioClient.statObject(
                this.bucket,
                fileName,
            );

            const fileInDataBaseInfo = await this.fileRepository.findOneBy({
                etag: statObject.etag,
            });
            if (fileInDataBaseInfo) {
                return fileInDataBaseInfo.url;
            }

            await this.fileRepository.save({
                fileName,
                fileSize: statObject.size,
                url: fileUrl,
                etag: statObject.etag,
            });

            fs.rmSync(targetFile);
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
                targetFile,
                fileName,
            );
        });
    }

    // 文件传统上传
    async uploadToMinIO(
        objectName: string,
        data: Buffer | fs.ReadStream,
        bucket: string = this.bucket,
    ) {
        console.log(objectName);

        const isExistBucket = await this.bucketExist(this.minioClient, bucket);
        if (!isExistBucket) {
            await this.minioClient.makeBucket(bucket);
        }

        // minio中是否有相同的文件
        const objectState = await this.objectState(bucket, objectName);

        if (objectState) {
            return `${this.baseFileUrl}${objectName}`;
        }
        // 文件上传
        const res = await this.minioClient.putObject(bucket, objectName, data);
        if (!res.etag) {
            throw new HttpException('上传失败', HttpStatus.BAD_REQUEST);
        }
        return `${this.baseFileUrl}${objectName}`;
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
     * 判断文件是否存在
     */
    objectState(bucket, objectName) {
        return new Promise<MinIO.BucketItemStat | false>(async (resolve) => {
            try {
                const statObject = await this.minioClient.statObject(
                    bucket,
                    objectName,
                );
                resolve(statObject);
            } catch (error) {
                resolve(false);
            }
        });
    }

    // /**
    //  * 文件分片上传到minio
    //  */
    // async chunkUpload(file: Express.Multer.File, body) {
    //     if (!file) {
    //         throw new HttpException('未选择文件', HttpStatus.BAD_REQUEST);
    //     }

    //     await this.uploadToMinIO(body.fileName, file.buffer, body.uuid);
    // }

    // /**
    //  * 分片合并
    //  */
    // async mergeFile(fileInfo) {
    //     console.log(fileInfo);

    //     const bucketStream = await this.minioClient.listObjects(
    //         fileInfo.uuid,
    //         '',
    //         true,
    //     );
    //     console.log(bucketStream);

    //     // minio 返回的是文件流，需要做下处理
    //     const fileList = await this.readData(bucketStream);
    //     console.log(fileList);
    //     return fileList;
    // }

    // async readData(stream: Stream) {
    //     return new Promise((resolve, reject) => {
    //         const a = [];
    //         stream
    //             .on('data', (row) => {
    //                 a.push(row);
    //             })
    //             .on('end', () => {
    //                 resolve(a);
    //             })
    //             .on('error', (error) => {
    //                 reject(error);
    //             });
    //     });
    // }
}
