import { FieldValidation } from '@/validation/protocols/field-validation';

import { InvalidFieldError } from '@/validation/errors';

export class EmailValidation implements FieldValidation {
    constructor(
        readonly fieldName: string
    ) {
        //
    }

    validate(email: string): Error | null {
        const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email) ? null : new InvalidFieldError('email');
    }
}
