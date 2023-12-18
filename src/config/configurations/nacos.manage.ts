import * as nacos from 'nacos';
import { envConfigVo } from '../config.interface';

export class NacosManager {
    private client: any;
    private DATA_ID = 'test';
    private GROUP = 'DEFAULT_GROUP';
    private NAMESPACE = 'd6a2e5a5-5511-4747-93a3-20fe4dc5e5f6';
    private SERVER_ADDR = `${process.env.SERVER_URL}:${process.env.NACOS_PORT}`;

    constructor() {
        if (process.env.SERVER_URL && process.env.NACOS_PORT) {
            this.getClient();
        }
    }

    private async getClient() {
        this.client = new nacos.NacosConfigClient({
            serverAddr: this.SERVER_ADDR,
            namespace: this.NAMESPACE,
            requestTimeout: 6000,
            identityKey: 'test',
            identityValue: 'test',
        });
    }

    public async getAllConfig(): Promise<envConfigVo> {
        const content = await this.client.getConfig(this.DATA_ID, this.GROUP);
        console.log(content, 'nacos配置');

        return JSON.parse(content);
    }
}
