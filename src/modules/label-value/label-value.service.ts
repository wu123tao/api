import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabelValueService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
    ) {}

    async roleListDropDown() {
        const res = await this.roleRepository.find();
        const list = res.map((item) => ({
            value: item.id,
            label: item.roleName,
        }));
        return list;
    }

    async userListDropDown() {
        const res = await this.userRepository.find();
        const list = res.map((item) => ({
            value: item.id,
            label: item.userName,
        }));
        return list;
    }

    async organizationListDropDown() {
        const res = await this.organizationRepository.find();
        const list = res.map((item) => ({
            value: item.id,
            label: item.companyName,
        }));
        return list;
    }
}
