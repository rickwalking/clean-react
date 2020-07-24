import {
    EmailValidation
} from '@/validation/validators/email/email-validation';

import { InvalidFieldError } from '@/validation/errors';

describe('EmailValidation', (): void => {
    test('should return error if email is invalid', (): void => {
        const sut = new EmailValidation('email');
        const error = sut.validate();
        expect(error).toEqual(new InvalidFieldError('email'));
    });
});
