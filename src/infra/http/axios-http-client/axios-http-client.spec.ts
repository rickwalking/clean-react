import {
    AxiosHttpClient
} from '@/infra/http/axios-http-client/axios-http-client';

import axios from 'axios';

import faker from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
};

describe('Axios HttpClient', () => {
    test('should call axios with correct URL and verb', async() => {
        const url: string = faker.internet.url();
        const sut = makeSut();
        await sut.post({ url });
        expect(mockedAxios.post).toHaveBeenLastCalledWith(url);
    });
});
