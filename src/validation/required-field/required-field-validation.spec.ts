import {
    RequiredFieldValidation
} from '@/validation/required-field/required-field-validation';

import { RequiredFieldError } from '@/validation/errors';

describe('', (): void => {
    test('should return error if field is empty', (): void => {
        const sut = new RequiredFieldValidation('email');
        const error = sut.validate('');
        expect(error).toEqual(new RequiredFieldError());
    });
});
