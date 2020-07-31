import { SetStorage } from '@/data/protocols/cache/set-storage';

export class SetStorageSpy implements SetStorage {
    public key: string = '';
    public value: string = '';

    async set(key: string, value: string): Promise<void> {
        this.key = key;
        this.value = value;
    }
}
