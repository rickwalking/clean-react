import {
    makeLoginValidation
} from '@/main/factories/pages/login/login-validation-factory';

import { ValidationComposite } from '@/validation/validators';

import {
    ValidationBuilder
} from '@/validation/validators/builder/validation-builder';

describe('LoginValidationFactory', (): void => {
    test('should make ValidationComposite with correct validations', (): void => {
        const composite = makeLoginValidation();
        expect(composite).toStrictEqual(ValidationComposite.build([
            ...ValidationBuilder.field('email').required().email().build(),
            ...ValidationBuilder.field('password').required().min(5).build()
        ]));
    });
});
