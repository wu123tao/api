import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Like, Repository } from 'typeorm';
import { OrganizationDto } from './dto/organization.dto';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';
import { DeleteOrganizationDto } from './dto/delete-organization.dto';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
    ) {}

    async create(createOrganizationDto: CreateOrganizationDto) {
        const { companyCode } = createOrganizationDto;
        const searchRes = await this.organizationRepository.findOneBy({
            companyCode,
        });

        if (searchRes)
            throw new HttpException(
                '该角色编码已存在',
                HttpStatus.NOT_ACCEPTABLE,
            );

        const res = await this.organizationRepository.save(
            createOrganizationDto,
        );
        if (!res) throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async findAll(roleDto: OrganizationDto, pageParams: BaseSearchDto) {
        const { companyCode, companyName } = roleDto;

        const { limit, page } = pageParams;
        const queryFilter = {
            ...roleDto,
            companyCode: Like(`%${companyCode ?? ''}%`),
            companyName: Like(`%${companyName ?? ''}%`),
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

    async update(updateOrganizationDto: UpdateOrganizationDto) {
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

    async remove(deleteOrganizationDto: DeleteOrganizationDto) {
        const { ids } = deleteOrganizationDto;
        await this.organizationRepository.delete(ids);
        return null;
    }
}
