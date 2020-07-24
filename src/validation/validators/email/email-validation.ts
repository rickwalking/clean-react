import { FieldValidation } from '@/validation/protocols/field-validation';

import { InvalidFieldError } from '@/validation/errors';

export class EmailValidation implements FieldValidation {
    constructor(
        readonly fieldName: string
    ) {
        //
    }

    validate(): Error | null {
        return new InvalidFieldError('email');
    }
}
