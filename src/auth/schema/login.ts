import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
