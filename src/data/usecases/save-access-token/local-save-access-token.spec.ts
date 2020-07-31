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

    test('should  throw if setStorage throws', (): void => {
        const { sut, setStorageMock } = makeSut();
        jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce((): Error => {
            return new Error();
        });
        const promise = sut.save(faker.random.uuid());
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        expect(promise).rejects.toThrow(new Error());
    });
});
