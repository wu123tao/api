import { ApiProperty } from '@nestjs/swagger';
import { IPage } from 'src/common/types';

export class UserDto extends IPage {
    @ApiProperty({ description: 'id', example: '', required: false })
    id: string;

    @ApiProperty({ description: '用户名', example: '', required: false })
    userName: string;

    @ApiProperty({ description: '账号', example: '', required: false })
    account: string;

    @ApiProperty({ description: '备注', example: '', required: false })
    remark: string;
}
