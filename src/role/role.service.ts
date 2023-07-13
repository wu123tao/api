import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Like, Repository } from 'typeorm';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { RoleDto } from './dto/role.dto';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        const { roleCode } = createRoleDto;
        const searchRes = await this.roleRepository.findOneBy({ roleCode });

        if (searchRes)
            throw new HttpException(
                '该角色编码已存在',
                HttpStatus.NOT_ACCEPTABLE,
            );

        const res = await this.roleRepository.save(createRoleDto);
        if (!res) throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async findAll(roleDto: RoleDto, pageParams: BaseSearchDto) {
        const { roleCode, roleName, remark } = roleDto;

        const { limit, page } = pageParams;
        const queryFilter = {
            ...roleDto,
            roleCode: Like(`%${roleCode ?? ''}%`),
            roleName: Like(`%${roleName ?? ''}%`),
            remark: Like(`%${remark ?? ''}%`),
        };

        const res = await this.roleRepository.findAndCount({
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
        const res = await this.roleRepository.findOneBy({ id });
        return res;
    }

    async update(updateRoleDto: UpdateRoleDto) {
        const { id } = updateRoleDto;

        const validId = await this.roleRepository.findOneBy({ id });

        if (!validId) {
            throw new HttpException('该角色不存在', HttpStatus.NOT_ACCEPTABLE);
        }

        const validUpdate = await this.roleRepository.update(id, updateRoleDto);
        if (!validUpdate)
            throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async remove(deleteRoleDto: DeleteRoleDto) {
        const { ids } = deleteRoleDto;
        await this.roleRepository.delete(ids);
        return null;
    }
}
