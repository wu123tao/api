import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * 创建用户参数
 */
export class CreateUserDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  @IsNotEmpty({ message: '请填写账号' })
  account: string;

  @ApiProperty({ description: '用户名', example: '超级管理员' })
  @IsNotEmpty({ message: '请填写用户名' })
  userName: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '请填写密码' })
  password: string;
}

/**
 * 创建用户参数
 */
export class EditUserDto {
  @ApiProperty({ description: 'id', example: 'admin' })
  @IsNotEmpty({ message: '请填写id' })
  id: string;

  @ApiProperty({ description: '账号', example: 'admin' })
  @IsNotEmpty({ message: '请填写账号' })
  account: string;

  @ApiProperty({ description: '用户名', example: '超级管理员' })
  @IsNotEmpty({ message: '请填写用户名' })
  userName: string;
}

/**
 * 用户信息
 */
export class UserListVo {
  @ApiProperty({ description: 'id', example: '' })
  id: string;

  @ApiProperty({ description: '账号', example: '' })
  account: string;

  @ApiProperty({ description: '用户名', example: '' })
  userName: string;

  @ApiProperty({ description: '密码', example: '' })
  password: string;
}

/**
 * 用户登录
 */
export class LoginDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  @IsNotEmpty({ message: '请填写账号' })
  account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '请填写密码' })
  password: string;
}
