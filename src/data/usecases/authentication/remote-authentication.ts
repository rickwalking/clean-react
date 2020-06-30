import { HttpClientPost } from '@/data/protocols/http/http-post-client';

import {
    AuthenticationParams
} from '@/domain/usecases/authentication';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpClientPost
    ) {
        //
    }

    async auth(params: AuthenticationParams): Promise<void> {
        const httpReponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        });

        switch (httpReponse.statusCode) {
            case HttpStatusCode.unathorized:
                throw new InvalidCredentialsError();
            default:
                return await Promise.resolve();
        }
    }
}
