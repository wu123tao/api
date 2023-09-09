import * as nacos from 'nacos';
import { envConfigVo } from '../config.interface';

export class NacosManager {
    private client: any;
    private DATA_ID = 'test';
    private GROUP = 'DEFAULT_GROUP';
    private NAMESPACE = 'fb369a8b-5b1c-404c-8456-58eddd0c9fe3';
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
            identityKey: 'example',
            identityValue: 'example',
        });
    }

    public async getAllConfig(): Promise<envConfigVo> {
        const content = await this.client.getConfig(this.DATA_ID, this.GROUP);
        return JSON.parse(content);
    }
}
