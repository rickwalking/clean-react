import {
    AxiosHttpClient
} from '@/infra/http/axios-http-client/axios-http-client';

import axios from 'axios';

import faker from 'faker';
import { HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.random.number()
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
});

describe('Axios HttpClient', () => {
    test('should call axios with correct values', async() => {
        const request = mockPostRequest();
        const sut = makeSut();
        await sut.post(request);
        expect(mockedAxios.post).toHaveBeenLastCalledWith(request.url, request.body);
    });

    test('should call axios with correct statusCode and body', async() => {
        const sut = makeSut();
        const httpResponse = await sut.post(mockPostRequest());
        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        });
    });
});
