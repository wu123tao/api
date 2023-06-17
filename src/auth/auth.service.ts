import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/users/db/user.model';
import { LoginDto } from './schema/login';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async login(loginDto: LoginDto) {
    const userInfo = await this.userModel.findOne({
      account: loginDto.account,
    });
    if (!userInfo)
      throw new HttpException('账号不存在', HttpStatus.NOT_ACCEPTABLE);

    return userInfo;
  }
}
