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
import { BaseSearchDto } from 'src/common/dto/search-params.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Role } from 'src/modules/role/entities/role.entity';

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
            password: md5(createUserDto.password ?? '123456'),
        });
        if (!res) throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
        return null;
    }

    /**
     * 连表查询
     * getMany()进行分页时
     *  只能使用 skip() 和 take()
     * getRawMany()进行分页时
     *  只能使用 limit() 和 offset()
     */
    async findList(userDto: UserDto, pageParams: BaseSearchDto) {
        const { account, userName, userCode } = userDto;

        const { limit, page } = pageParams;

        const queryFilter = {
            ...userDto,
            userCode: Like(`%${userCode ?? ''}%`),
            account: Like(`%${account ?? ''}%`),
            userName: Like(`%${userName ?? ''}%`),
        };

        /**
         * 方法一
         * 此方法没法把role表中的信息与user表的信息做平级处理
         * 但是获取的数据的字段是实体类里的字段，无需做转换处理
         */
        // const [rows, total] = await this.usersRepository
        //     .createQueryBuilder('user')
        //     .leftJoinAndMapOne(
        //         'user.roleId',
        //         Role,
        //         'role',
        //         'role.id = user.roleId',
        //     )
        //     .where(queryFilter)
        //     .skip((page - 1) * limit)
        //     .take(limit)
        //     .select()
        //     .getManyAndCount();

        // const pages = Math.ceil(total / limit);
        // return {
        //     pages,
        //     records: rows,
        //     size: limit,
        //     total,
        //     current: page,
        // };

        /**
         * 方法二
         * 此方法可以把role表中的信息与user表的信息做平级处理
         * 但是获取的数据的字段名是表中的原生字段，需做转换处理
         */
        const queryBuilder = this.usersRepository.createQueryBuilder('user');

        const total = (await queryBuilder.getRawMany()).length;

        const rows = await queryBuilder
            .leftJoinAndSelect(Role, 'role', 'role.id = user.role_id')
            .limit(limit)
            .offset((page - 1) * limit)
            .select(
                `
                user.id,
                user.account,
                user.user_code as userCode,
                user.user_name as userName,
                user.user_email as userEmail,
                user.user_phone as userPhone,
                user.remark,
                user.role_id as roleId,
                role.role_code as roleCode,
                role.role_name as roleName
                `,
            )
            .where(queryFilter)
            .getRawMany();
        const pages = Math.ceil(total / limit);

        return {
            pages,
            records: rows,
            size: limit,
            total,
            current: page,
        };
    }

    async findOne(id: string) {
        const res = await this.usersRepository.findOneBy({ id });
        return res;
    }

    async update(updateUserDto: UpdateUserDto) {
        const { id } = updateUserDto;

        const validId = await this.usersRepository.findOneBy({ id });

        if (!validId) {
            throw new HttpException('该用户不存在', HttpStatus.NOT_ACCEPTABLE);
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

    async resetPassword(userDto: ResetPasswordDto) {
        const { id } = userDto;
        const validId = await this.usersRepository.findOneBy({ id });

        if (!validId) {
            throw new HttpException('该用户不存在', HttpStatus.NOT_ACCEPTABLE);
        }
        await this.usersRepository.update(id, {
            password: md5('123456'),
        });
        return null;
    }

    createToken(loginDto: LoginDto) {
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

        const token = this.createToken(validateAccount);

        return { ...omit(validateAccount, 'password'), token };
    }
}
