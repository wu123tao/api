import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './schema/login';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@ApiTags('用户登录')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginDto: LoginDto) {
    console.log('JWT验证 - Step 1: 用户请求登录');

    const validate = await this.authService.validateUser(loginDto);
    if (!validate)
      throw new HttpException('生成token失败', HttpStatus.BAD_REQUEST);

    return this.authService.certificate(loginDto);

    // return await this.usersService.login(loginDto);
  }
}
