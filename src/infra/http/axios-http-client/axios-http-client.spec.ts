import {
    AxiosHttpClient
} from '@/infra/http/axios-http-client/axios-http-client';

import { mockAxios, mockHttpResponse } from '@/infra/test';
import { mockPostRequest } from '@/data/test';

import axios from 'axios';

jest.mock('axios');

type SutTypes = {
    sut: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxios();

    return {
        sut,
        mockedAxios
    };
};

describe('Axios HttpClient', () => {
    test('should call axios with correct values', async(): Promise<void> => {
        const request = mockPostRequest();
        const { sut, mockedAxios } = makeSut();
        await sut.post(request);
        expect(mockedAxios.post).toHaveBeenLastCalledWith(request.url, request.body);
    });

    test('should call axios with correct statusCode and body', (): void => {
        const { sut, mockedAxios } = makeSut();
        const promise = sut.post(mockPostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });

    test('should return correct statusCode and body on failure', (): void => {
        const { sut, mockedAxios } = makeSut();
        mockedAxios.post.mockRejectedValueOnce({
            response: mockHttpResponse()
        });

        const promise = sut.post(mockPostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
});
