import {
    LocalStorageAdapter
} from '@/infra/cache/local-storage-adapter';

import 'jest-localstorage-mock';

import { cleanup } from '@testing-library/react';

import faker from 'faker';

type SutTypes = {
    sut: LocalStorageAdapter;
};

const makeSut = (): SutTypes => {
    const sut = new LocalStorageAdapter();

    return {
        sut
    };
};

describe('LocalStorageAdapter', (): void => {
    afterEach(cleanup);
    beforeEach((): void => {
        localStorage.clear();
    });

    test('should call LocalStorage with correct values', async (): Promise<void> => {
        const { sut } = makeSut();
        const key = faker.database.column();
        const value = faker.random.uuid();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await sut.set(key, value);
        expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
    });
});
