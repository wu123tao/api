import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './db/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  CreateUserDto,
  LoginDto,
  EditUserDto,
  UserListVo,
} from './schema/user';
import * as md5 from 'md5';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Get('list')
  @ApiOperation({ summary: '用户列表' })
  @ApiOkResponse({
    description: '用户列表',
    type: UserListVo,
    isArray: true,
  })
  async index() {
    const res = await this.userModel.find();
    return res;
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
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

  @Get('findById')
  @ApiOperation({ summary: '查询用户信息' })
  async detail(@Query('id') id: string) {
    const res = await this.userModel.findById(id);
    return res;
  }

  @Put('edit')
  @ApiOperation({ summary: '编辑用户信息' })
  async edit(@Body() editUserDto: EditUserDto) {
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

  @Delete('delete/:id')
  @ApiOperation({ summary: '删除用户' })
  async deleteUser(@Param('id') id: string) {
    const res = await this.userModel.findByIdAndDelete(id);
    return res;
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginDto: LoginDto) {
    const userInfo = await this.userModel.findOne({
      account: loginDto.account,
    });
    if (!userInfo) return { code: 200, message: '账号不存在', data: null };

    return userInfo;
  }
}
