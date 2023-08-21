import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentDto } from './dto/department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';
import { Organization } from 'src/modules/organization/entities/organization.entity';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,

        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
    ) {}

    async create(createDepartmentDto: CreateDepartmentDto) {
        if (!createDepartmentDto.organizationId) {
            throw new HttpException('请先选择组织', HttpStatus.BAD_REQUEST);
        }

        const { departmentCode } = createDepartmentDto;
        const searchRes = await this.departmentRepository.findOneBy({
            departmentCode,
        });

        if (searchRes)
            throw new HttpException(
                '该角色编码已存在',
                HttpStatus.NOT_ACCEPTABLE,
            );

        const res = await this.departmentRepository.save(createDepartmentDto);
        if (!res) throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async findAll(departmentDto: DepartmentDto) {
        const { id } = departmentDto;
        // 校验组织是否存在
        // const validateOrganization =
        //     await this.organizationRepository.findOneBy({ id });
        // if (!validateOrganization) return [];

        const departmentList = await this.departmentRepository.findBy({
            organizationId: id,
        });
        return this.getDepartmentRelationShip(departmentList);
    }

    async findOne(id: string) {
        return await this.departmentRepository.findOneBy({ id });
    }

    async update(updateOrganizationDto: UpdateDepartmentDto) {
        const { id } = updateOrganizationDto;

        const validId = await this.departmentRepository.findOneBy({ id });

        if (!validId) {
            throw new HttpException('该角色不存在', HttpStatus.NOT_ACCEPTABLE);
        }

        const validUpdate = await this.departmentRepository.update(
            id,
            updateOrganizationDto,
        );
        if (!validUpdate)
            throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async remove(deleteOrganizationDto: DeleteDepartmentDto) {
        const { ids } = deleteOrganizationDto;
        await this.departmentRepository.delete(ids);
        return null;
    }

    getDepartmentRelationShip(list: any[]) {
        if (list.length === 0) return [];
        if (list.length === 1) return list;

        const treeArr = [];
        const map = {};
        list.forEach((item) => {
            if (!item.deptParentId) {
                item.departmentVoList = [];
            }
            map[item.id] = item;
        });

        list.forEach((item) => {
            const parent = map[item.deptParentId];
            if (parent) {
                if (!parent.departmentVoList) {
                    parent.departmentVoList = [];
                }
                parent.departmentVoList.push(item);
            } else {
                treeArr.push(item);
            }
        });

        return treeArr;
    }
}
