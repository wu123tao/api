import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import * as md5 from 'md5';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { LoginDto } from './dto/login.dto';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { IPage } from 'src/common/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
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

    async findList(userDto: UserDto, pageParams: IPage) {
        const { account, userName, remark } = userDto;

        const { limit, page } = pageParams;

        const queryFilter = {
            ...userDto,
            account: Like(`%${account ?? ''}%`),
            userName: Like(`%${userName ?? ''}%`),
            remark: Like(`%${remark ?? ''}%`),
        };

        const users = this.usersRepository.findAndCount({
            where: queryFilter,
            skip: (page - 1) * limit,
            take: limit,
        });

        const pages = Math.ceil(users[1] / limit);
        return {
            pages,
            records: users[0],
            size: limit,
            total: users[1],
            current: page,
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

    async createToken(loginDto: LoginDto) {
        const payload = { ...loginDto };
        console.log('JWT验证 - Step 3: 处理 jwt 签证');

        try {
            const token = this.jwtService.sign(payload);

            return token;
        } catch (error) {
            throw new HttpException('生成token失败', HttpStatus.BAD_REQUEST);
        }
    }

    async login(loginDto: LoginDto) {
        console.log('JWT验证 - Step 1: 用户请求登录');
        const { account, password } = loginDto;
        const validateAccount = await this.usersRepository.findOneBy({
            account,
        });

        console.log('JWT验证 - Step 2: 校验用户信息');
        if (!validateAccount)
            throw new HttpException('该用户不存在', HttpStatus.NOT_ACCEPTABLE);

        if (md5(password) !== validateAccount.password)
            throw new HttpException('密码错误', HttpStatus.NOT_ACCEPTABLE);

        const token = await this.createToken(validateAccount);

        return { ...omit(validateAccount, 'password'), token };
    }
}
