import {
    LocalSaveAccessToken
} from '@/data/usecases/save-access-token/local-save-access-token';

import { SetStorageSpy } from '@/data/test/mock-storage';

import faker from 'faker';

type SutTypes = {
    sut: LocalSaveAccessToken;
    setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);

    return {
        sut,
        setStorageSpy
    };
};

describe('LocalSaveAccessToken', (): void => {
    test('should  call SetStorage with correct value', (): void => {
        const { sut, setStorageSpy } = makeSut();
        const accessToken = faker.random.uuid();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        sut.save(accessToken);
        expect(setStorageSpy.key).toBe('accessToken');
        expect(setStorageSpy.value).toBe(accessToken);
    });
});
