import {
    RequiredFieldValidation
} from '@/validation/validators';

import {
    ValidationBuilder as sut
} from '@/validation/validators/builder/validation-builder';

describe('ValidationBuilder', (): void => {
    test('should return RequiredFieldValidation', (): void => {
        const validations = sut.field('any_field').required().build();
        expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
    });
});
