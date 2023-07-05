import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import * as md5 from 'md5';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { account } = createUserDto;
        const searchRes = await this.usersRepository.findOneBy({ account });

        if (searchRes)
            throw new HttpException('该账号已存在', HttpStatus.NOT_ACCEPTABLE);

        const res = await this.usersRepository.save({
            ...createUserDto,
            password: md5(createUserDto.password),
        });
        if (!res) throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async findList(userDto: UserDto) {
        const { account, userName, remark, page = 1, pageSize = 2 } = userDto;
        const queryFilter = {
            ...userDto,
            account: Like(`%${account ?? ''}%`),
            userName: Like(`%${userName ?? ''}%`),
            remark: Like(`%${remark ?? ''}%`),
        };

        const res = await this.usersRepository.findAndCount({
            where: queryFilter,
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const pages = Math.ceil(res[1] / pageSize);

        return {
            pages,
            records: res[0],
            size: pageSize,
            total: res[1],
        };
    }

    async findOne(id: string) {
        const res = await this.usersRepository.findOneBy({ id });
        return res;
    }

    async update(updateUserDto: UpdateUserDto) {
        const { id, account } = updateUserDto;

        const validId = await this.usersRepository.findOneBy({ id });

        if (!validId) {
            throw new HttpException('该用户不存在', HttpStatus.NOT_ACCEPTABLE);
        }
        if (account) {
            const validAccount = await this.usersRepository.findOneBy({
                account: account,
            });
            if (validAccount) {
                throw new HttpException(
                    '账号已存在',
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
        }

        const validUpdate = await this.usersRepository.update(
            id,
            updateUserDto,
        );
        if (!validUpdate)
            throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    async remove(deleteUserDto: DeleteUserDto) {
        const { ids } = deleteUserDto;
        await this.usersRepository.delete(ids);
        return null;
    }
}
