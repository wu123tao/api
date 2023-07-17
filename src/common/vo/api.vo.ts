import { ApiProperty } from '@nestjs/swagger';
import { API_CODE, API_MESSAGE } from '../const/api.const';

export class BaseResponse {
    @ApiProperty({ description: '状态码', default: API_CODE.OK })
    code: number;

    @ApiProperty({ description: '提示消息', default: API_MESSAGE[API_CODE.OK] })
    message: string;
}

export class SuccessResponse<T> extends BaseResponse {
    @ApiProperty({ description: '提示消息' })
    data: T;
}

export class IPageResponse<T> extends BaseResponse {
    @ApiProperty({ description: '总页数' })
    pages: number;

    @ApiProperty({ description: '数据' })
    records: T[];

    @ApiProperty({ description: '数量' })
    size: number;

    @ApiProperty({ description: '总数' })
    total: number;

    @ApiProperty({ description: '页码' })
    current: number;
}
