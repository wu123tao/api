export interface MysqlConfig {
    host: string;
    port: number;
    password: string;
    exp: number;
}

export interface RedisConfig {
    socket: {
        socket: string;
        port: number;
    };
    password: string;
    ttl: number;
}

export interface EmailConfig {
    transport: {
        host: string;
        port: number;
        auth: {
            user: string;
            pass: string;
        };
    };
}

export interface MinioConfig {
    endPoint: string;
    port: number;
    accessKey: string;
    secretKey: string;
    bucket: string;
}

// 环境变量的结构体
export interface envConfigVo {
    mysqlConfig: MysqlConfig;
    redisConfig: RedisConfig;
    emailConfig: EmailConfig;
    minioConfig: MinioConfig;
}
