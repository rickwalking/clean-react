import {
    RequiredFieldValidation
} from '@/validation/required-field/required-field-validation';

import { RequiredFieldError } from '@/validation/errors';

import faker from 'faker';

const makeSut = (): RequiredFieldValidation =>
    new RequiredFieldValidation(faker.database.column());

describe('', (): void => {
    test('should return error if field is empty', (): void => {
        const sut = makeSut();
        const error = sut.validate('');
        expect(error).toEqual(new RequiredFieldError());
    });

    test('should return falsy if field is not empty', (): void => {
        const sut = makeSut();
        const error = sut.validate(faker.random.word());
        expect(error).toBeFalsy();
    });
});
