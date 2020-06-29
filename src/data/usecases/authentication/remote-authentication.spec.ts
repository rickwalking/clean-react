import { RemoteAuthentication } from './remote-authentication';

import { HttpClientPost } from '../../protocols/http/http-post-client';

describe('RemoveAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async() => {
        class HttpPostClientSpy implements HttpClientPost {
            url?: string;
            async post(url: string): Promise<void> {
                this.url = url;
                return await Promise.resolve();
            }
        };

        const url = 'any_url';
        const httpPostClient = new HttpPostClientSpy();
        const systemUnderTest = new RemoteAuthentication(
            url,
            httpPostClient
        );
        await systemUnderTest.auth();
        expect(httpPostClient.url).toBe(url);
    });
});
