import { RemoteAuthentication } from './remote-authentication';

import { HttpPostClientSpy } from '../../test/mock-http-client';

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
        await systemUnderTest.auth();
        expect(httpPostClientSpy.url).toBe(url);
    });
});
