import {
    RemoteAuthentication
} from '@/data/usecases/authentication/remote-authentication';

import { HttpPostClientSpy } from '@/data/test';

import {
    mockAuthentication,
    mockAccountModel
} from '@/domain/test/mock-account';
import {
    AuthenticationParams
} from '@/domain/usecases/authentication';
import {
    InvalidCredentialsError,
    UnexpectedError
} from '@/domain/errors';

import { AccountModel } from '@/domain/models';

import { HttpStatusCode } from '@/data/protocols/http';

import faker from 'faker';

type SutTypes = {
    systemUnderTest: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel> =
        new HttpPostClientSpy();
    const systemUnderTest: RemoteAuthentication = new RemoteAuthentication(
        url,
        httpPostClientSpy
    );

    return {
        systemUnderTest,
        httpPostClientSpy
    };
};

describe('RemoveAuthentication', (): void => {
    test('Should call HttpPostClient with correct URL', async(): Promise<void> => {
        const url: string = faker.internet.url();
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest(url);
        await systemUnderTest.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    });

    test('Should call HttpPostClient with correct body', async(): Promise<void> => {
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest();
        const authenticationParams: AuthenticationParams = mockAuthentication();
        await systemUnderTest.auth(authenticationParams);
        expect(httpPostClientSpy.body).toEqual(authenticationParams);
    });

    test('should throw InvalidCredentialsError if HttpPostClient return 401', async() => {
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        };

        const promise = systemUnderTest.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new InvalidCredentialsError());
    });

    test('should throw UnexpectedError if HttpPostClient return 400', async() => {
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        };

        const promise = systemUnderTest.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('should throw UnexpectedError if HttpPostClient return 500', async() => {
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        };

        const promise = systemUnderTest.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('should throw UnexpectedError if HttpPostClient return 404', async() => {
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        };

        const promise = systemUnderTest.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('should return an AccountModel if HttpClient returns 200', async() => {
        const {
            systemUnderTest,
            httpPostClientSpy
        } = makeSystemUnderTest();
        const httpResult = mockAccountModel();

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        };

        const account = await systemUnderTest.auth(mockAuthentication());
        expect(account).toEqual(httpResult);
    });
});
