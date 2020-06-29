import { RemoteAuthentication } from './remote-authentication';

import { HttpPostClientSpy } from '../../test/mock-http-client';

describe('RemoveAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async() => {
        const url: string = 'any_url';
        const httpPostClient: HttpPostClientSpy = new HttpPostClientSpy();
        const systemUnderTest: RemoteAuthentication = new RemoteAuthentication(
            url,
            httpPostClient
        );
        await systemUnderTest.auth();
        expect(httpPostClient.url).toBe(url);
    });
});
