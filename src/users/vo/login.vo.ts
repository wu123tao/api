import { ApiProperty } from '@nestjs/swagger';
import { UserVo } from './user.vo';

export class LoginVo extends UserVo {
    @ApiProperty({ description: 'token', default: '' })
    token: string;
}
