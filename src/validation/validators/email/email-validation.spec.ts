import {
    EmailValidation
} from '@/validation/validators/email/email-validation';

import { InvalidFieldError } from '@/validation/errors';

import faker from 'faker';

const makeSut = (): EmailValidation => new EmailValidation('email');

describe('EmailValidation', (): void => {
    test('should return error if email is invalid', (): void => {
        const sut = makeSut();
        const error = sut.validate(faker.random.word());
        expect(error).toEqual(new InvalidFieldError('email'));
    });

    test('should return falsy if email is valid', (): void => {
        const sut = makeSut();
        const error = sut.validate(faker.internet.email());
        expect(error).toBeFalsy();
    });
});
