import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite';

import { FieldfieldValidationSpy } from '@/validation/validators/test/mock-field-validation';

describe('ValidationComposite', (): void => {
    test('should return error if any validation fails', (): void => {
        const fieldValidationSpy = new FieldfieldValidationSpy('any_field');
        fieldValidationSpy.error = new Error('first_error_message');
        const fieldValidationSpy2 = new FieldfieldValidationSpy('any_field');
        fieldValidationSpy2.error = new Error('second_error_message');
        const sut = new ValidationComposite([
            fieldValidationSpy,
            fieldValidationSpy2
        ]);
        const error = sut.validate('any_field', 'any_value');
        expect(error).toBe('first_error_message');
    });
});
