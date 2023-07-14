import { ApiProperty } from '@nestjs/swagger';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';

export class UserDto extends BaseSearchDto {
    @ApiProperty({ description: 'id', required: false })
    id: string;

    @ApiProperty({ description: '用户编码', required: false })
    userCode: string;

    @ApiProperty({ description: '用户名', required: false })
    userName: string;

    @ApiProperty({ description: '账号', required: false })
    account: string;

    @ApiProperty({ description: '角色id', required: false })
    roleId: string;

    @ApiProperty({ description: '邮箱', required: false })
    userEmail: string;

    @ApiProperty({ description: '手机号', required: false })
    userPhone: string;

    @ApiProperty({ description: '备注', required: false })
    remark: string;
}
