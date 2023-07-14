import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentDto } from './dto/department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private organizationRepository: Repository<Department>,
    ) {}

    async create(createDepartmentDto: CreateDepartmentDto) {
        const { departmentCode } = createDepartmentDto;
        const searchRes = await this.organizationRepository.findOneBy({
            departmentCode,
        });

        if (searchRes)
            throw new HttpException(
                '该角色编码已存在',
                HttpStatus.NOT_ACCEPTABLE,
            );

        const res = await this.organizationRepository.save(createDepartmentDto);
        if (!res) throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async findAll(roleDto: DepartmentDto, pageParams: BaseSearchDto) {
        const { departmentCode, departmentName } = roleDto;

        const { limit, page } = pageParams;
        const queryFilter = {
            ...roleDto,
            departmentCode: Like(`%${departmentCode ?? ''}%`),
            departmentName: Like(`%${departmentName ?? ''}%`),
        };

        const res = await this.organizationRepository.findAndCount({
            where: queryFilter,
            skip: (page - 1) * limit,
            take: limit,
        });

        const pages = Math.ceil(res[1] / limit);

        return {
            pages,
            records: res[0],
            size: limit,
            total: res[1],
            current: page,
        };
    }

    async findOne(id: string) {
        return await this.organizationRepository.findOneBy({ id });
    }

    async update(updateOrganizationDto: UpdateDepartmentDto) {
        const { id } = updateOrganizationDto;

        const validId = await this.organizationRepository.findOneBy({ id });

        if (!validId) {
            throw new HttpException('该角色不存在', HttpStatus.NOT_ACCEPTABLE);
        }

        const validUpdate = await this.organizationRepository.update(
            id,
            updateOrganizationDto,
        );
        if (!validUpdate)
            throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async remove(deleteOrganizationDto: DeleteDepartmentDto) {
        const { ids } = deleteOrganizationDto;
        await this.organizationRepository.delete(ids);
        return null;
    }
}
