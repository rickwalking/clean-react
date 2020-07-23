import { FieldValidation } from '@/validation/protocols/field-validation';

import { RequiredFieldError } from '@/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
    constructor(
        readonly fieldName: string
    ) {
        //
    }

    validate(fieldValue: string): Error {
        return new RequiredFieldError();
    }
}
