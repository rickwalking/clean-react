import { HttpClientPost } from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpClientPost {
    url?: string;
    async post(url: string): Promise<void> {
        this.url = url;
        return await Promise.resolve();
    }
}
