import { FieldValidation } from '@/validation/protocols/field-validation';

export class FieldfieldValidationSpy implements FieldValidation {
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
