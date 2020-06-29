export type HttpPostParams = {
    url: string;
    body?: object;
};

export interface HttpClientPost {
    post(params: HttpPostParams): Promise<void>;
}
