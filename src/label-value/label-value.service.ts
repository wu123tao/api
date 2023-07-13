import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabelValueService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async roleListDropDown() {
        const res = await this.roleRepository.find();
        const list = res.map((item) => ({
            value: item.id,
            label: item.roleCode,
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
}
