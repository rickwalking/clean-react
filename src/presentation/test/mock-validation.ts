import { Validation } from '@/presentation/protocols/validation';

export class ValidationStub implements Validation {
    errorMessage: string | undefined = '';

    validate(fieldName: string, fieldValue: string): string {
        if (this.errorMessage === undefined) {
            return '';
        }

        return this.errorMessage;
    }
}
