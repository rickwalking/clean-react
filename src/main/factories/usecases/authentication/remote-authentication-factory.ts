import { makeApiUrl } from '@/main/factories/http/axios/api-url-factory';

import { makeAxiosHttpClient } from '@/main/factories/http/axios/axios-http-client-factory';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';

import { Authentication } from '@/domain/usecases';

export const makeRemoteAuthentication = (): Authentication => {
    return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient());
};
