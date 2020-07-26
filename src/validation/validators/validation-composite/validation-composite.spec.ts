import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite';

import { FieldfieldValidationSpy as FieldValidationSpy } from '@/validation/validators/test/mock-field-validation';

type SutTypes = {
    sut: ValidationComposite;
    fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): {
    sut: any;
    fieldValidationSpy: FieldValidationSpy[];
} => {
    const fieldValidationSpy = [
        new FieldValidationSpy('any_field'),
        new FieldValidationSpy('any_field')
    ];

    const sut = new ValidationComposite(fieldValidationSpy);

    return {
        sut,
        fieldValidationSpy
    };
};

describe('ValidationComposite', (): void => {
    test('should return error if any validation fails', (): void => {
        const { sut, fieldValidationSpy } = makeSut();
        fieldValidationSpy[0].error = new Error('first_error_message');
        fieldValidationSpy[1].error = new Error('second_error_message');
        const error = sut.validate('any_field', 'any_value');
        expect(error).toBe('first_error_message');
    });
});
