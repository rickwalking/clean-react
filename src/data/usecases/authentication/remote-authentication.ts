import { HttpClientPost } from '../../protocols/http/http-post-client';

import {
    AuthenticationParams
} from '../../../domain/usecases/authentication';

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpClientPost
    ) {
        //
    }

    async auth(params: AuthenticationParams): Promise<void> {
        await this.httpPostClient.post({
            url: this.url,
            body: params
        });
    }
}
