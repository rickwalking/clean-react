import {
    RemoteAuthentication
} from '@/data/usecases/authentication/remote-authentication';

import { HttpPostClientSpy } from '@/data/test/mock-http-client';

import {
    mockAuthentication
} from '@/domain/test/mock-authentication';
import {
    AuthenticationParams
} from '@/domain/usecases/authentication';

import faker from 'faker';

type SutTypes = {
    systemUnderTest: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy;
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy: HttpPostClientSpy = new HttpPostClientSpy();
    const systemUnderTest: RemoteAuthentication = new RemoteAuthentication(
        url,
        httpPostClientSpy
    );

    return {
        systemUnderTest,
        httpPostClientSpy
    };
};

describe('RemoveAuthentication', (): void => {
    test('Should call HttpPostClient with correct URL', async(): Promise<void> => {
        const url: string = faker.internet.url();
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest(url);
        await systemUnderTest.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    });

    test('Should call HttpPostClient with correct body', async(): Promise<void> => {
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest();
        const authenticationParams: AuthenticationParams = mockAuthentication();
        await systemUnderTest.auth(authenticationParams);
        expect(httpPostClientSpy.body).toEqual(authenticationParams);
    });
});
