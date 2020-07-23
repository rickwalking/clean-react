import {
    RequiredFieldValidation
} from '@/validation/required-field/required-field-validation';

import { RequiredFieldError } from '@/validation/errors';

import faker from 'faker';

describe('', (): void => {
    test('should return error if field is empty', (): void => {
        const sut = new RequiredFieldValidation('email');
        const error = sut.validate('');
        expect(error).toEqual(new RequiredFieldError());
    });

    test('should return falsy if field is not empty', (): void => {
        const sut = new RequiredFieldValidation('email');
        const error = sut.validate(faker.random.word());
        expect(error).toBeFalsy();
    });
});
