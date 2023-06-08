import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './db/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto, EditUserDto, LoginDto } from './schema/user';
import * as md5 from 'md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async getList() {
    const res = await this.userModel.find();
    return res;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { password, account } = createUserDto;
    const userinfo = await this.userModel.findOne({ account: account });

    if (userinfo && userinfo.id) {
      throw new HttpException('该账号已存在', HttpStatus.NOT_ACCEPTABLE);
    }
    const md5Password = md5(password);
    const createLoginInfo = { ...createUserDto, password: md5Password };
    await this.userModel.create(createLoginInfo);

    return true;
  }

  async getInfoById(id: string) {
    const res = await this.userModel.findById(id);
    return res;
  }

  async editUser(editUserDto: EditUserDto) {
    try {
      const userInfo = await this.userModel.findById(editUserDto.id);

      await this.userModel.findByIdAndUpdate(userInfo.id, editUserDto);
      return true;
    } catch (error) {
      throw new HttpException('编辑用户失败', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return true;
  }

  async login(loginDto: LoginDto) {
    const userInfo = await this.userModel.findOne({
      account: loginDto.account,
    });
    if (!userInfo)
      throw new HttpException('账号不存在', HttpStatus.NOT_ACCEPTABLE);

    return userInfo;
  }
}
