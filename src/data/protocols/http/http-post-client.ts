export type HttpPostParams = {
    url: string;
};

export interface HttpClientPost {
    post(params: HttpPostParams): Promise<void>;
}
