import { HttpClientPost } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';

import {
    AuthenticationParams,
    Authentication
} from '@/domain/usecases/authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AccountModel } from '@/domain/models/account-model';

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpClientPost<AuthenticationParams, AccountModel>
    ) {
        //
    }

    async auth(params: AuthenticationParams): Promise<AccountModel | undefined> {
        const httpReponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        });

        switch (httpReponse.statusCode) {
            case HttpStatusCode.ok:
                return httpReponse.body;
            case HttpStatusCode.unathorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
