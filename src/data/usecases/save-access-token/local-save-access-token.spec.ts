import {
    LocalSaveAccessToken
} from '@/data/usecases/save-access-token/local-save-access-token';

import { SetStorageSpy } from '@/data/test/mock-storage';

import faker from 'faker';

describe('LocalSaveAccessToken', (): void => {
    test('should  call SetStorage with correct value', (): void => {
        const setStorageSpy = new SetStorageSpy();
        const sut = new LocalSaveAccessToken(setStorageSpy);
        const accessToken = faker.random.uuid();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        sut.save(accessToken);
        expect(setStorageSpy.key).toBe('accessToken');
        expect(setStorageSpy.value).toBe(accessToken);
    });
});
