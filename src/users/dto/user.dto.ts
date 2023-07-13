import { ApiProperty } from '@nestjs/swagger';
import { BaseSearchDto } from 'src/common/dto/search-params.dto';

export class UserDto extends BaseSearchDto {
    @ApiProperty({ description: 'id' })
    id: string;

    @ApiProperty({ description: '用户编码' })
    userCode: string;

    @ApiProperty({ description: '用户名' })
    userName: string;

    @ApiProperty({ description: '账号' })
    account: string;

    @ApiProperty({ description: '邮箱' })
    userEmail: string;

    @ApiProperty({ description: '手机号' })
    userPhone: string;

    @ApiProperty({ description: '备注' })
    remark: string;
}
