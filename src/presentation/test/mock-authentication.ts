import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models';

export class AuthenticationSpy implements Authentication {
    account = mockAccountModel();
    params: AuthenticationParams = {
        email: '',
        password: ''
    };

    async auth(
        params: AuthenticationParams
    ): Promise<AccountModel | undefined> {
        this.params = params;
        return await Promise.resolve(this.account);
    }
}
