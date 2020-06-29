import {
    HttpClientPost,
    HttpPostParams
} from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpClientPost {
    url?: string;
    async post(params: HttpPostParams): Promise<void> {
        this.url = params.url;
        return await Promise.resolve();
    }
}
