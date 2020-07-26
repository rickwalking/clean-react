import { FieldValidation } from '@/validation/protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
    error: Error | null = null;

    constructor(
        readonly fieldName: string
    ) {
        //
    }

    validate(value: string): Error | null {
        return this.error;
    }
}
