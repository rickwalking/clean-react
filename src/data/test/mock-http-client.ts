import {
    HttpClientPost,
    HttpPostParams
} from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpClientPost {
    url?: string;
    body?: object;
    async post(params: HttpPostParams): Promise<void> {
        this.url = params.url;
        this.body = params.body;
        return await Promise.resolve();
    }
}
