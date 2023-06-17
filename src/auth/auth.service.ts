import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/users/db/user.model';
import { LoginDto } from './schema/login';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(loginDto: LoginDto) {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userModel.findOne(loginDto);

    if (!user) throw new HttpException('账号不存在', HttpStatus.NOT_ACCEPTABLE);

    return user;
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(loginDto: LoginDto) {
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
    const userInfo = await this.userModel.findOne({
      account: loginDto.account,
    });
    if (!userInfo)
      throw new HttpException('账号不存在', HttpStatus.NOT_ACCEPTABLE);

    return userInfo;
  }
}
