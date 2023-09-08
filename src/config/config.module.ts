import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NacosManager } from './configurations/nacos.manage';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [async () => new NacosManager().getAllConfig()],
        }),
    ],
})
export class VmpConfigModule {}
