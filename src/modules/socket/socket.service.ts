import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/modules/tools/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocketService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepository: Repository<FileEntity>,
    ) {}

    async findCount() {
        const fileList = await this.fileRepository.find();
        return { fileCount: fileList.length };
    }
}
