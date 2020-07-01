import {
    HttpClientPost,
    HttpStatusCode
} from '@/data/protocols/http';

import {
    AuthenticationParams,
    Authentication
} from '@/domain/usecases/authentication';
import {
    InvalidCredentialsError,
    UnexpectedError
} from '@/domain/errors';

import { AccountModel } from '@/domain/models';

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
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
