import { InvalidFieldError } from '@/validation/errors';

import {
    MinLengthValidation
} from '@/validation/validators/min-length/min-length-validation';

import faker from 'faker';

const makeSut = (minLength: number): MinLengthValidation =>
    new MinLengthValidation(faker.database.column(), minLength);

describe('minLengthValidation', (): void => {
    test('should return erro if value is invalid', (): void => {
        const sut = makeSut(5);
        const error = sut.validate(faker.random.alphaNumeric(4));
        expect(error).toEqual(new InvalidFieldError('field'));
    });

    test('should return falsy if value is valid', (): void => {
        const sut = makeSut(5);
        const error = sut.validate(faker.random.alphaNumeric(5));
        expect(error).toBeFalsy();
    });
});
