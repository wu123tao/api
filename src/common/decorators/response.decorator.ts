import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { IPageResponse, SuccessResponse } from '../vo/api.vo';
import { API_CODE } from '../const/api.const';

/**
 * 无返回对象的响应状态
 */
export const OKResponse = () => {
    const decorators = [
        ApiExtraModels(SuccessResponse),
        ApiResponse({
            status: API_CODE.OK,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(SuccessResponse) },
                    {
                        properties: {
                            data: { example: null },
                        },
                    },
                ],
            },
        }),
    ];
    return applyDecorators(...decorators);
};

/**
 * 分页形式的响应状态
 */
export const PageResponse = <T extends Type<any>>(model: T) => {
    const decorators = [
        ApiExtraModels(IPageResponse),
        ApiExtraModels(model),
        ApiResponse({
            status: API_CODE.OK,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(IPageResponse) },
                    {
                        properties: {
                            records: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    ];
    return applyDecorators(...decorators);
};

/**
 * 有返回对象的响应状态
 */
export const OKResponseData = <T extends Type<any>>(model: T) => {
    const decorators = [
        ApiExtraModels(SuccessResponse),
        ApiExtraModels(model),
        ApiResponse({
            status: API_CODE.OK,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(SuccessResponse) },
                    {
                        properties: {
                            data: { $ref: getSchemaPath(model) },
                        },
                    },
                ],
            },
        }),
    ];
    return applyDecorators(...decorators);
};

/**
 * 数组形式的响应状态
 */
export const OKResponseArr = <T extends Type<any>>(model: T) => {
    const decorators = [
        ApiExtraModels(SuccessResponse),
        ApiExtraModels(model),
        ApiResponse({
            status: API_CODE.OK,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(SuccessResponse) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    ];
    return applyDecorators(...decorators);
};
