import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import * as md5 from 'md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { account } = createUserDto;
    const searchRes = await this.usersRepository.findOneBy({ account });
    console.log(searchRes);

    if (searchRes)
      throw new HttpException('该账号已存在', HttpStatus.NOT_ACCEPTABLE);
    const res = await this.usersRepository.save({
      ...createUserDto,
      password: md5(createUserDto.password),
    });
    if (!res) throw new HttpException('操作失败', HttpStatus.BAD_REQUEST);
    return null;
  }

  async findList() {
    const res = await this.usersRepository.find();
    return { res };
  }
}
