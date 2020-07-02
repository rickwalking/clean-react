import {
    AxiosHttpClient
} from '@/infra/http/axios-http-client/axios-http-client';

import axios from 'axios';

import faker from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Axios HttpClient', () => {
    test('should call axios with correct URL', async() => {
        const url: string = faker.internet.url();
        const sut = new AxiosHttpClient();
        await sut.post({ url });
        expect(mockedAxios).toHaveBeenLastCalledWith(url);
    });
});
