import {
    RequiredFieldValidation,
    EmailValidation,
    MinLengthValidation
} from '@/validation/validators';

import {
    ValidationBuilder as sut
} from '@/validation/validators/builder/validation-builder';

describe('ValidationBuilder', (): void => {
    test('should return RequiredFieldValidation', (): void => {
        const validations = sut.field('any_field').required().build();
        expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
    });

    test('should return EmailValidation', (): void => {
        const validations = sut.field('any_field').email().build();
        expect(validations).toEqual([new EmailValidation('any_field')]);
    });

    test('should return EmailValidation', (): void => {
        const validations = sut.field('any_field').min(5).build();
        expect(validations).toEqual([new MinLengthValidation('any_field', 5)]);
    });
});
