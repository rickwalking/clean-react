import { FieldValidation } from '@/validation/protocols/field-validation';

import { RequiredFieldError } from '@/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
    constructor(
        readonly fieldName: string
    ) {
        //
    }

    validate(fieldValue: string): Error | null {
        return fieldValue.length > 0 ? null : new RequiredFieldError();
    }
}
