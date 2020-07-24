import { InvalidFieldError } from '@/validation/errors';

import {
    MinLengthValidation
} from '@/validation/validators/min-length/min-length-validation';

describe('minLengthValidation', (): void => {
    test('should return erro if value is invalid', (): void => {
        const sut = new MinLengthValidation('field', 5);
        const error = sut.validate('123');
        expect(error).toEqual(new InvalidFieldError('field'));
    });
});
