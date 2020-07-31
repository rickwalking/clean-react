import {
    LocalSaveAccessToken
} from '@/data/usecases/save-access-token/local-save-access-token';

import { SetStorageMock } from '@/data/test/mock-storage';

import faker from 'faker';

type SutTypes = {
    sut: LocalSaveAccessToken;
    setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageMock();
    const sut = new LocalSaveAccessToken(setStorageSpy);

    return {
        sut,
        setStorageMock: setStorageSpy
    };
};

describe('LocalSaveAccessToken', (): void => {
    test('should  call SetStorage with correct value', (): void => {
        const { sut, setStorageMock } = makeSut();
        const accessToken = faker.random.uuid();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        sut.save(accessToken);
        expect(setStorageMock.key).toBe('accessToken');
        expect(setStorageMock.value).toBe(accessToken);
    });
});
