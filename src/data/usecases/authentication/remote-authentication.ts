import { HttpClientPost } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpClientPost
    ) {
        //
    }

    async auth(): Promise<void> {
        await this.httpPostClient.post(this.url);
    }
}
