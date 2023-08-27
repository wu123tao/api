export const API_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
};

export const API_MESSAGE = {
    [API_CODE.OK]: '操作成功',
    [API_CODE.BAD_REQUEST]: '操作失败',
    [API_CODE.UNAUTHORIZED]: 'token已过期',
    [API_CODE.INTERNAL_SERVER_ERROR]: '服务端错误',
};
