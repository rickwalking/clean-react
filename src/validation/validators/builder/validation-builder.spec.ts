import {
    RequiredFieldValidation,
    EmailValidation,
    MinLengthValidation
} from '@/validation/validators';

import {
    ValidationBuilder as sut
} from '@/validation/validators/builder/validation-builder';

import faker from 'faker';

describe('ValidationBuilder', (): void => {
    test('should return RequiredFieldValidation', (): void => {
        const field = faker.database.column();

        const validations = sut.field(field).required().build();
        expect(validations).toStrictEqual([new RequiredFieldValidation(field)]);
    });

    test('should return EmailValidation', (): void => {
        const field = faker.database.column();

        const validations = sut.field(field).email().build();
        expect(validations).toStrictEqual([new EmailValidation(field)]);
    });

    test('should return EmailValidation', (): void => {
        const field = faker.database.column();
        const length = faker.random.number();

        const validations = sut.field(field).min(length).build();
        expect(validations).toStrictEqual([new MinLengthValidation(field, length)]);
    });

    test('should return a list of validations', (): void => {
        const field = faker.database.column();
        const length = faker.random.number();

        const validations =
            sut.field(field).required().min(length).email().build();
        expect(validations).toStrictEqual([
            new RequiredFieldValidation(field),
            new MinLengthValidation(field, length),
            new EmailValidation(field)
        ]);
    });
});
