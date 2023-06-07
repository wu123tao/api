import { Injectable } from '@nestjs/common';
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
      return {
        error: '该账号已存在',
      };
    }
    const md5Password = md5(password);
    const createLoginInfo = { ...createUserDto, password: md5Password };
    const res = await this.userModel.create(createLoginInfo);

    return { success: res };
  }

  async getInfoById(id: string) {
    const res = await this.userModel.findById(id);
    return res;
  }

  async editUser(editUserDto: EditUserDto) {
    try {
      const userInfo = await this.userModel.findById(editUserDto.id);

      await this.userModel.findByIdAndUpdate(userInfo.id, editUserDto);
      return { code: 200, message: '操作成功', data: null };
    } catch (error) {
      return {
        code: 500,
        message: '用户不存在',
        data: null,
      };
    }
  }

  async deleteUser(id: string) {
    const res = await this.userModel.findByIdAndDelete(id);
    return res;
  }

  async login(loginDto: LoginDto) {
    const userInfo = await this.userModel.findOne({
      account: loginDto.account,
    });
    if (!userInfo) return { code: 200, message: '账号不存在', data: null };

    return userInfo;
  }
}
